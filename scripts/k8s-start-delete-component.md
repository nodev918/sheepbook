簡介：
 用於方便啟動和刪除 k8s 元件(component) 的腳本

邏輯：
啟動 k8s 元件時，紀錄元件到當前目錄的components-record.txt下，腳本會讀取該檔案來進行新增或刪除

使用：
1. 確保script 可以被執行:
sudo chmod +x 腳本名稱(請自行輸入!)
hmod +x 腳本名稱(請自行輸入!)

2. 啟動有兩種方式
 a. 直接啟動 script，並根據提示輸入參數
 b. 啟動 script 時，後方請帶入 dev | development | prod | production 其中一種參數

script 會去抓同層目錄底下， *-[dev | development | prod | prodution].yaml 執行

script 內容:
#!/bin/bash

function init (){
  local parameter=$1;

  if [ $parameter ]; then
    ENVIROMENT=$parameter;
  else
    echo -ne "簡易啟動和刪除 k8s component 的 script, 會自動抓取同層目錄下名為 *-[dev | development | prod | production].yaml 腳本\n";
    echo -ne "請輸入你要啟動的環境\n"
    echo -ne "1. dev \n2. development \n3. prod \n4. production\n";

    read -p "請輸入: " ENVIROMENT;
  fi
}

init $1;

readonly COMPONENTS_RECORD="./components-record.txt"
readonly COLOR_RED='\033[0;31m'
readonly COLOR_NONE='\033[0m'
readonly COLOR_GREEN='\033[0;32m'

# 目的：希望用區域變數, 來取得被 created 的 k8s components record, 以減少全域變數
function get_components_record() {
  local components=();
  local is_creadted=$1;

  if [ -f $COMPONENTS_RECORD ]; then
    while IFS= read -r k8s_component;
      do
        if [ $is_creadted ]; then
          # 不需要被回傳, 用於顯示被 created 的 component
          echo -e "$COLOR_GREEN$k8s_component created\n" >&2;
        fi

        components+=($k8s_component)
      done < $COMPONENTS_RECORD
  fi

  # 這裡主要用於回傳，但同時也會被 echo to stdout(理想: 只是單傳 return 但不 echo)
  echo "${components[@]}" # return all of be created k8s component
}

function getK8sYamlFiles (){
  local prod=3;
  local production=4;

  case $ENVIROMENT in
    $prod | $production | "prod" | "production")
      echo "$(ls *-prod.yaml && ls *-production.yaml)";
      ;;
    *)
      echo "$(ls *-dev.yaml && ls *-development.yaml)";
      ;;
  esac
}

function start() {
  local FILES=$(getK8sYamlFiles);

  for file in ${FILES[@]}
    do
      if [ -f "$file" ]; then
        kubectl apply -f $file | cut -d" " -f1 >> $COMPONENTS_RECORD;
      else
        echo "$COLOR_RED $file is not exist";
      fi
    done

  local is_created=true;
  get_components_record $is_created;
}

function end() {
  if [ -f $COMPONENTS_RECORD ]; then
    local IS_SUCCESS=0;
    local components=$(get_components_record);

    for component in ${components[@]}
      do
        echo -e "\n$component is deleting";

        kubectl delete $component;

        # $? 代表上一次指令是否執行成功
        if [ $? == $IS_SUCCESS ]; then
          # 目的: 如果 k8s component 被 deleted 後，同步清除 components_record
          # 優化: 每次 delete 後都是用重寫覆蓋的方式, 數量若增大, 這麼做可能不是好辦法
          echo "$(grep -v "$component" $COMPONENTS_RECORD)" > $COMPONENTS_RECORD
        else
          echo -ne "$COLOR_RED sorry, $component deleted failure!!! \n"
        fi
      done

    # 清空 empty line
    sed -i "" "/^$/d" $COMPONENTS_RECORD;

    if ! [ -s $COMPONENTS_RECORD ]; then
      rm $COMPONENTS_RECORD;
    fi
  fi
}

# 可以建立 func main 來跑腳本, 這邊就沒這麼做了
# main script, COMPONENTS_RECORD 代表 k8s components 是否有被建立
if [ -f $COMPONENTS_RECORD ]; then
  echo -ne "start to delete k8s components\n";

  end;
else
  echo -ne "start to create k8s components\n";

  start;
fi

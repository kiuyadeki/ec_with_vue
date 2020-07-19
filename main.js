//I changed! I made a branch!

var nodeApp = document.querySelector('#app');
//event handler登録
var nodeCheckbox = nodeApp.querySelectorAll('input[type="checkbox"]');
nodeCheckbox[0].addEventListener('change', onCheckChanged, false);
nodeCheckbox[1].addEventListener('change', onCheckChanged, false);

//並び替え
var nodeSelect = nodeApp.querySelector('.sorting');
nodeSelect.addEventListener('change', onOrderChanged, false);
var nodeItemOrg = nodeApp.querySelectorAll('.item');

//チェック状態変更
function onCheckChanged(event) {
    var nodeItems = nodeApp.querySelectorAll('.item');
    var nodeCount = nodeApp.querySelector('.count');
    var count = nodeItems.length;

    for (var i = 0; i < nodeItems.length; i++){
    showNode(nodeItems[i]);
    }

    if (nodeCheckbox[0].checked) {
        for (var i = 0; i < nodeItems.length; i++) {
            if (!isSaleItem(nodeItems[i])) { //i番目のitemのstatusのテキスト内容がSALEでないならば以下の処理を実行
                hideNode(nodeItems[i]);
                count --;
            }
        }
    }

    if (nodeCheckbox[1].checked) {
        for (var i = 0; i < nodeItems.length; i++) {
            if (!isDelvFreeItem(nodeItems[i])) { //i番目のitemのshipping_feeのテキスト内容が送料無料出ないならば以下の処理を実行
                hideNode(nodeItems[i]);
                count --;
            }
        }
    }
    nodeCount.textContent = count + '件';
}

//並び替え
function onOrderChanged(event) {
    var nodeList = nodeApp.querySelector('.list'); //商品一覧のlistクラスを定義
    var nodeItems = nodeApp.querySelectorAll('.item'); //全ての itemクラスを定義 ?Q:何で同じ定義で２つ目の変数作るの？(nodeItemOrg)_A:nodeItemsはこの関数内で変更されるけどnodeItemOrgは変更されない

    var products = []; //productsに空の配列を定義
    for( var i = 0; i < nodeItems.length; i++) {
        products.push(nodeItems[i]); //products配列内にitemクラスを順番に挿入
    }

    while (nodeList.firstChild) { //nodeList内の最初の子要素がtrueな場合(ここではitemクラスが存在する間はずっと):結果としてDOMから全ての商品ノードを削除する
        nodeList.removeChild(nodeList.firstChild); //nodeListの最初の子要素を削除
    }

    if (event.target.value == '1') { //イベントの起こった要素のvalueが１(ここではvalue1は"標準"が選択されている場合)であるならば(eventは単なる引数でありなんでも良い)
        for( var i = 0; i < products.length; i++) {
            nodeList.appendChild(nodeItemOrg[i]); //nodeListの最後にnodeItemOrg[i]を子要素として追加
        }
    }
    else if (event.target.value == '2') { //"安い順"が選択されている場合
        products.sort( function(a, b) {
            var prevPrice = parseInt(a.querySelector('.price span').textContent.replace(',','')); //parseIntで文字列を数値として抽出、replaceでカンマを削除
            var currentPrice = parseInt(b.querySelector('.price span').textContent.replace(',','')); //上と同じ
            return prevPrice - currentPrice; //aがbより大きい時は、aをbの後ろに並び替え、小さい時はそのままa,bの順
        });

        for (var i = 0; i < products.length; i++) { //products内の要素を順番に商品一覧の中に追加
            nodeList.appendChild(products[i]); 
        }
    }
}

function isSaleItem(nodeItems) {
    var node = nodeItems.querySelector('.status'); //i番目のitemのstatusをnodeとする
    return (node && node.textContent == 'SALE'); //statusのテキスト内容がSALEであるかの真偽
} //nodeが存在する(statusクラスが無いitemはnodeがundefinedになる)かつnode内のテキストがSALEの場合のみtrueを返す

function isDelvFreeItem(nodeItems) {
    var node = nodeItems.querySelector('.shipping_fee'); //i番目のitemのshipping_feeをnodeとする
    return (node && node.textContent == '送料無料'); //shipping_feeのテキスト内容が送料無料かの真偽値を返す
}

function hideNode(node) {
    node.setAttribute('style', 'display:none;'); //nodeのstyleをdisplay:noneにする
}

function showNode(node) {
    node.removeAttribute('style'); //nodeのstyleを削除する
}


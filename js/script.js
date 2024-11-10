window.addEventListener('load', function () {
    var mess_box = document.getElementById('textbox');
    var mess_text = document.getElementById('text');
    var mswin_flg = true;
    var stop_flg = false;
    var end_flg = false;
    var scene_cnt = 0;
    var line_cnt = 0;
    const interval = 30;
    var select_num1 = 0;
    var select_num2 = 0;
    var select_num3 = 0;
    var select1 = document.getElementById('select1');
    var select2 = document.getElementById('select2');
    var select3 = document.getElementById('select3');
    var select_text1 = document.getElementById('selectText1');
    var select_text2 = document.getElementById('selectText2');
    var select_text3 = document.getElementById('selectText3');
    let split_chars; //よくわからないけどいるみたい
    var text = [];

    text[0] = [
        "",
        "<fadeIn_chara 1 1>おはよございます。今日の授業を始めていきたいと思います。",
        "<item 1><chara 1 0><fadeIn_chara 5 1>図のようにマッチ棒を並べて、正方形を横につないだ形を作ります。",
        "<select1 1><select2 2><select3 none><text1 10本><text2 わからない><selectBox>正方形を3個作るとき、マッチ棒は何本必要でしょうか？"
    ];





    function main() {
        var tmp = split_chars.shift();
        if (tmp == '<') {
            let tagget_str = '';
            tmp = split_chars.shift();
            while (tmp != '>') {
                tagget_str += tmp;
                tmp = split_chars.shift();

            }
            tagget_str = tagget_str.split(/\s/);
            switch (tagget_str[0]) {
                case 'stop':
                    stop_flg = true;
                    break;
                case 'selectBox':
                    $('.selectBox').addClass('show');
                    break;
                case 'text1':
                    select_text1.innerHTML = tagget_str[1];
                    break;
                case 'text2':
                    select_text2.innerHTML = tagget_str[1];
                    break;
                case 'text3':
                    select_text3.innerHTML = tagget_str[1];
                    break;
                case 'select1':
                    if (tagget_str[1] === "none") {
                        $('#select1').addClass('none');
                    } else {
                        select_num1 = tagget_str[1];
                        select1.addEventListener('click', function () {
                            scene_cnt = select_num1;
                            line_cnt = -1;
                            $('.selectBox').removeClass('show');
                            selectNoneRemove();
                            textClick();
                        });
                    }
                    break;
                case 'select2':
                    if (tagget_str[1] === "none") {
                        $('#select2').addClass('none');
                    } else {
                        select_num2 = tagget_str[1];
                        select2.addEventListener('click', function () {
                            scene_cnt = select_num2;
                            line_cnt = -1;
                            $('.selectBox').removeClass('show');
                            selectNoneRemove();
                            textClick();
                        });
                    }
                    break;
                case 'select3':
                    if (tagget_str[1] === "none") {
                        $('#select3').addClass('none');
                    } else {
                        select_num3 = tagget_str[1];
                        select3.addEventListener('click', function () {
                            scene_cnt = select_num3;
                            line_cnt = -1;
                            $('.selectBox').removeClass('show');
                            selectNoneRemove();
                            textClick();
                        });
                    }
                    break;
                case 'break':
                    mess_text.innerHTML += '<br>';
                    break;
                case 'skip':
                    scene_cnt = tagget_str[1];
                    line_cnt = -1;
                    break;
                case 'bg':
                    document.getElementById('bgimg').src = 'img/bg' + tagget_str[1] + '.jpg';
                    break;
                case 'chara':
                    document.getElementById('chara' + tagget_str[1]).src = 'img/chara' + tagget_str[2] + '.png';
                    break;
                case 'item':
                    document.getElementById('item').src = 'img/item' + tagget_str[1] + '.png';
                    break;

                case 'fadeIn_chara':
                    function fadeIn_chara_remove() {
                        $('#charaposition' + tagget_str[1]).removeClass('fadein');
                    }
                    $('#charaposition' + tagget_str[1]).addClass('fadein');
                    document.getElementById('chara' + tagget_str[1]).src = 'img/chara' + tagget_str[2] + '.png';
                    setTimeout(fadeIn_chara_remove, 500);
                    break;
                case 'fadeIn_bg':
                    function fadeIn_bg_remove() {
                        $('#bgimg').removeClass('fadein');
                    }
                    $('#bgimg').addClass('fadein');
                    setTimeout(fadeIn_bg_remove, 500);
                    break;
                case 'fadeIn_item':
                    function fadeIn_item_remove() {
                        $('.itembox').removeClass('fadein');
                    }
                    $('.itembox').addClass('fadein');
                    setTimeout(fadeIn_item_remove, 500);
                    break;
                case 'fadeOut_chara':
                    function fadeOut_chara_remove() {
                        $('#charaposition' + tagget_str[1]).removeClass('fadeout');
                        document.getElementById('chara' + tagget_str[1]).src = 'img/chara' + tagget_str[2] + '.png';
                    }
                    $('#charaposition' + tagget_str[1]).addClass('fadeout');
                    setTimeout(fadeOut_chara_remove, 500);
                    break;
                case 'fadeOut_bg':
                    function fadeOut_bg_remove() {
                        $('#bgimg').removeClass('fadeout');
                        document.getElementById('bgimg').src = 'img/bg' + tagget_str[1] + '.jpg';
                    }
                    $('#bgimg').addClass('fadeout');
                    setTimeout(fadeOut_bg_remove, 500);
                    break;
                case 'fadeOut_item':
                    function fadeOut_item_remove() {
                        $('.itembox').removeClass('fadeout');
                        document.getElementById('item').src = 'img/item0.png';
                    }
                    $('.itembox').addClass('fadeout');
                    setTimeout(fadeOut_item_remove, 500);
                    break;
                case 'fadeOutIn_bg':
                    function fadeOutIn_bg_change() {
                        document.getElementById('bgimg').src = 'img/bg' + tagget_str[1] + '.jpg';
                    }
                    function fadeOutIn_bg_remove() {
                        $('#bgimg').removeClass('fadeoutin');
                        $('#textbox').removeClass('none');
                        $('#textbox').trigger('click');
                    }
                    $('#bgimg').addClass('fadeoutin');
                    $('#textbox').addClass('none');
                    setTimeout(fadeOutIn_bg_change, 1500);
                    setTimeout(fadeOutIn_bg_remove, 3000);
                    break;
            }
        }
        if (!stop_flg) {
            if (tmp) {
                if (tmp != '>') mess_text.innerHTML += tmp;
                setTimeout(main, interval);

            }
        } else {
            mess_text.innerHTML += '<span class="blink-text"></span>';
        }
    }

    mess_box.addEventListener('click', function () {
        if (end_flg) return;
        if (mswin_flg) {
            if (!stop_flg) {
                line_cnt++; //次の文に行く

                // //読み上げを行う関数
                // //WebSpeechApiにて実行してる
                // let textDate = text[scene_cnt];
                // var textRead = textDate[line_cnt];
                // // コマンドを除去する正規表現
                // textRead = textRead.replace(/<[^>]*>/g, ''); // <...> の形式のテキストを削除
                // var msg = new SpeechSynthesisUtterance();
                // console.log(textRead);
                // msg.text = textRead;
                // msg.lang = 'ja-JP';
                // msg.rate = 3.0;//速度
                // msg.pitch = 0.3;//声の高さ

                // window.speechSynthesis.speak(msg);




                if (line_cnt >= text[scene_cnt].length) {
                    line_cnt = 0;
                }
            } else if (scene_cnt >= text.length) {
                end_flg = true;
                return;
            }
            split_chars = text[scene_cnt][line_cnt].split('');
            mess_text.innerHTML = '';
            main();


        }

    }
    );

    function textClick() {
        $('#textbox').trigger('click');

        function selectNoneRemove() {
            $('#select1').removeClass('none');
            $('#select2').removeClass('none');
            $('#select3').removeClass('none');
        }
    }

    //キャンバス用の関数
    const canvas = document.querySelector('#drawing-area');
    const ctx = canvas.getContext('2d');
    const clearBtn = document.querySelector('#clear-button');
    const colorPicker = document.querySelector('#color-picker'); // 色選択用
    const showBtn = document.querySelector('#show-canvas-button');
    const wrapper = document.querySelector('.wrapper');

    let x;
    let y;
    let mousePressed = false;
    let selectedColor = 'black'; // デフォルトの色を黒に設定



    showBtn.addEventListener('click', () => {
        //wrapper.style.display = 'block';
        wrapper.classList.toggle('none');
        if (showBtn.innerHTML === 'ノートを表示') {
            showBtn.innerHTML = 'ノートを非表示';
        } else {
            showBtn.innerHTML = 'ノートを表示';
        }

        console.log("おしたよ");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const chara = new Image();
        chara.src = "./img/item3.png";  // 画像のURLを指定
        chara.onload = () => {
            ctx.drawImage(chara, 0, 0);
        }

    });


    // 色を選択する
    colorPicker.addEventListener('change', (e) => {
        selectedColor = e.target.value;
        ctx.strokeStyle = selectedColor; // 選択した色に設定
    });

    //描画を開始する
    function startDrawing(xPos, yPos) {
        mousePressed = true;
        x = xPos;
        y = yPos;
    }

    //線を描画する
    function draw(xPos, yPos) {
        if (!mousePressed) return;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(xPos, yPos);
        ctx.lineWidth = 5;  // 線の太さを設定
        ctx.stroke();
        x = xPos;
        y = yPos;
    }

    // マウスイベント
    canvas.addEventListener('mousedown', (e) => startDrawing(e.offsetX, e.offsetY));
    canvas.addEventListener('mousemove', (e) => draw(e.offsetX, e.offsetY));
    window.addEventListener('mouseup', () => mousePressed = false);

    // タッチイベント
    canvas.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
    });

    canvas.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        draw(touch.clientX - rect.left, touch.clientY - rect.top);
        e.preventDefault();  // スクロールなどのデフォルト動作を無効化
    });

    window.addEventListener('touchend', () => mousePressed = false);

    ///消去ボタンクリックで全消去
    clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const chara = new Image();
        chara.src = "./img/item3.png";  // 画像のURLを指定
        chara.onload = () => {
            ctx.drawImage(chara, 0, 0); // 背景画像も再描画
        };
    });

    let cvReady = false;

    cv.onRuntimeInitialized = () => {
        cvReady = true;
        console.log('OpenCV.js is ready');
    };

    const comparisonImagePaths = [
        'img/image1.jpg',
        'img/image2.jpg',
        'img/image3.jpg',
        'img/image4.jpg'
    ];

    let targetImage = null;

    const saveButton = document.getElementById("save-button");
    const submitCan = document.getElementById("drawing-area");

    saveButton.addEventListener("click", () => {
        // キャンバスのコンテキストを取得し、willReadFrequentlyをtrueに設定
        const ctx = submitCan.getContext("2d", { willReadFrequently: true });

        // キャンバスのピクセルデータを取得
        const imageData = ctx.getImageData(0, 0, submitCan.width, submitCan.height);

        // OpenCVで扱える形式（マット形式）に変換
        const src = cv.matFromImageData(imageData);
        console.log("保存");

        // ターゲット画像を設定
        targetImage = src;

        console.log("画像比較処理を開始");

        // 画像処理を開始
        processImages();
    });

    function processImages() {
        if (!cvReady) {
            alert("OpenCV.jsはまだ読み込まれていません。");
            return;
        }

        if (!targetImage) {
            alert("ターゲット画像を選択してください");
            return;
        }

        console.log("画像比較処理を開始");

        // 比較用の画像を非同期に読み込む
        Promise.all(comparisonImagePaths.map(loadImage)).then(comparisonImages => {

            console.log("画像がすべて読み込まれました");
            const targetGray = convertToGray(targetImage);
            const targetDescriptors = extractDescriptors(targetGray);

            let bestMatchIndex = -1;
            let highestMatchScore = 0;

            // 各比較画像との類似度を計算
            comparisonImages.forEach((comparisonImage, index) => {
                const comparisonGray = convertToGray(comparisonImage);
                const comparisonDescriptors = extractDescriptors(comparisonGray);
                const matchScore = matchDescriptors(targetDescriptors, comparisonDescriptors);

                if (matchScore > highestMatchScore) {
                    highestMatchScore = matchScore;
                    bestMatchIndex = index;
                }
            });

            console.log(`最も類似する画像: ${comparisonImagePaths[bestMatchIndex]} with score ${highestMatchScore}`);
        }).catch(error => {
            console.error("画像読み込みエラー:", error);
        });
    }

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                // HTMLImageElementをキャンバスに描画してからMatに変換
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
    
                // キャンバスの画像データを取得
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
                // imageDataからMatオブジェクトを作成
                const mat = cv.matFromImageData(imageData);
                resolve(mat);  // 変換したmatを返す
            };
            img.onerror = (err) => reject(new Error(`画像読み込みエラー: ${src}`));
        });
    }
    
    function convertToGray(imageMat) {
        // imageMatがMat形式であることを確認
        if (imageMat.empty()) {
            console.error("画像が空です");
            return null;
        }
    
        const grayMat = new cv.Mat();
        cv.cvtColor(imageMat, grayMat, cv.COLOR_RGBA2GRAY);
        return grayMat;
    }
    

    function extractDescriptors(imageMat) {
        const orb = new cv.ORB();
        const keypoints = new cv.KeyPointVector();
        const descriptors = new cv.Mat();
        orb.detect(imageMat, keypoints);
        orb.compute(imageMat, keypoints, descriptors);
        return { keypoints, descriptors };
    }

    function matchDescriptors(targetDescriptors, comparisonDescriptors) {
        const bf = new cv.BFMatcher(cv.NORM_HAMMING, true);
        const matches = new cv.DMatchVector();
        bf.match(targetDescriptors.descriptors, comparisonDescriptors.descriptors, matches);

        const matchScore = matches.size();
        return matchScore;
    }
})

(
    () => {

        const DocNumber = "hoge-99999";
        const mojiSize = 24

        const doc = this;

        // 連番
        const pageNum1Baseds = [...Array(doc.numPages)].map((_null, i) => i + 1);

        // ページサイズ取得
        const aRect = doc.getPageBox("Media");
        const width = Math.round((((aRect[2] - aRect[0]) / 72) * 25.4));
        const height = Math.round((((aRect[1] - aRect[3]) / 72) * 25.4));

        // テキストボックスの座標 (単位 mm)
        const [x1mm, y1mm] = [10, height - 5];
        const [x2mm, y2mm] = [x1mm + 100, y1mm - 10];
        const rot = 0;

        const [x1, y1, x2, y2] = [x1mm, y1mm, x2mm, y2mm].map(
            x => (72 / 25.4) * x
        );

        const pageNums = pageNum1Baseds.map(p => p - 1);

        doc.syncAnnotScan();

        pageNums.forEach(pageNum => {
            // テキストボックス注釈を追加
            const spans = new Array();
            spans[0] = new Object();
            spans[0].textColor = color.black;
            spans[0].textSize = mojiSize;
            spans[0].text = DocNumber + " ( " + (pageNum + 1) + " / " + pageNums.length + " )";

            const annotFreeText = addAnnot({
                page: pageNum, type: "FreeText",
                rect: [x1, y1, x2, y2], rotate: rot,
                richContents: spans,

                // 書式はテキストのプロパティにて手動で設定
                //contents: DocNumber + " ( " + (pageNum + 1) + " / " + pageNums.length + " )",
                //contentsColor: color.black,

                // ----- [表示方法] タブ ----- //
                // style: "",
                // style: "D", dash: [3, 2], 
                // borderEffectStyle: "",
                // borderEffectStyle: "C", borderEffectIntensity: 1, 
                // strokeColor: ["RGB", 192 / 255, 0 / 255, 0 / 255],
                // opacity: 1.0, // 透過率 
                width: 0, // 枠線幅 
                fillColor: ["T"], // 背景色


                // -------------------- //
                lock: false, readOnly: false,
                hidden: false, noView: false, toggleNoView: false,
                print: true, delay: false
            });
        });

    }
)();
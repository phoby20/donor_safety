
function FullTextSearch()
{
    var charset;
    var keyword;
    var shibiri;        //絞り込み用パラメータ（仮）
    var lastquery;
    var param;
    var dataset;
    var st;
    var re;
    var nv;
    var nv2;
    var max;
    var KC;
    var last;
    var result_prefix;
    var result_suffix;
    var result_prefix_glue;
    var result_suffix_glue;
    var param_name;
    var param_name_refine1;        //絞り込み用パラメータ（仮）
    var param_name_refine2;        //絞り込み用パラメータ（仮）

    var param_yearfrom;        //絞り込み用パラメータ（仮）
    var param_yearto;        //絞り込み用パラメータ（仮）

    var param_name_hasimage;        //絞り込み用パラメータ（仮）
    var param_name_class1;        //絞り込み用パラメータ（仮）
    var param_name_class2;        //絞り込み用パラメータ（仮）
    var param_name_class3;        //絞り込み用パラメータ（仮）
    var case_array;
    var zenhan;
    var refine2;
    var caption;

    var test;        //test

    this.charset    = 'UTF-8';
    this.max        = 50;

    this.param_name = 'keyword';
    this.param_name2 = 'bmh'; //bmh 検索
    this.param_name3 = 'pbsch'; //pbsch 検索
    this.param_name4 = 'cases'; //case_place 検索
    this.param_name5 = 'pageNum'; //case_place 検索

    this.param_name_refine1 = 'refine1';    //絞り込み用パラメータ（仮）
    this.param_name_refine2 = 'refine2';    //絞り込み用パラメータ（仮）
    this.param_name_yearfrom = 'yearfrom';    //絞り込み用パラメータ（仮）
    this.param_name_yearto = 'yearto';    //絞り込み用パラメータ（仮）
    this.param_name_hasimage = 'hasimage';    //絞り込み用パラメータ（仮）
    this.param_name_class1 = 'class1';    //絞り込み用パラメータ（仮）
    this.param_name_class2 = 'class2';    //絞り込み用パラメータ（仮）
    this.param_name_class3 = 'class3';    //絞り込み用パラメータ（仮）
    this.param_name_pageNum = 'pageNum';    //絞り込み用パラメータ（仮）
    this.refine2     = true;
    this.zenhan     = true;

    this.result_prefix = 40; //検索語の前文字数
    this.result_suffix = 40; //検索語の後文字数

    this.result_prefix_glue = Math.floor(this.result_prefix / 4);
    this.result_suffix_glue = Math.floor(this.result_suffix / 4);

    this.KC = {
        enter: 13,
        left : 37,
        right: 39
    };

    this.case_array = [
        '[AaＡａ]', '[BbＢｂ]', '[CcＣｃ]',
        '[DdＤｄ]', '[EeＥｅ]', '[FfＦｆ]',
        '[GgＧｇ]',    '[HhＨｈ]', '[IiＩｉ]',
        '[JjＪｊ]',    '[KkＫｋ]', '[LlＬｌ]',
        '[MmＭｍ]',    '[NnＮｎ]',    '[OoＯｏ]',
        '[PpＰｐ]',    '[QqＱｑ]', '[RrＲｒ]',
        '[SsＳｓ]',    '[TtＴｔ]', '[UuＵｕ]',
        '[VvＶｖ]',    '[WwＷｗ]', '[XxＸｘ]',
        '[YyＹｙ]',    '[ZzＺｚ]',
        '[0０]', '[1１]',
        '[2２]', '[3３]',
        '[4４]', '[5５]',
        '[6６]', '[7７]',
        '[8８]', '[9９]',
        '[\-ーｰ]', '[。｡]', '[、､]', '[｢「]', '[｣」]', '[%％]', '[\'’‘´]',
        '([がガ]|ｶﾞ)', '([ぎギ]|ｷﾞ)', '([ぐグ]|ｸﾞ)', '([げゲ]|ｹﾞ)',    '([ごゴ]|ｺﾞ)',
        '([ざザ]|ｻﾞ)', '([じジ]|ｼﾞ)', '([ずズ]|ｽﾞ)', '([ぜゼ]|ｾﾞ)',    '([ぞゾ]|ｿﾞ)',
        '([だダ]|ﾀﾞ)', '([ぢヂ]|ﾁﾞ)', '([づヅ]|ﾂﾞ)', '([でデ]|ﾃﾞ)',    '([どド]|ﾄﾞ)',
        '([ばバ]|ﾊﾞ)', '([びビ]|ﾋﾞ)', '([ぶブ]|ﾌﾞ)', '([べベ]|ﾍﾞ)',    '([ぼボ]|ﾎﾞ)',
        '([ぱパ]|ﾊﾟ)', '([ぴピ]|ﾋﾟ)', '([ぷプ]|ﾌﾟ)', '([ぺペ]|ﾍﾟ)',    '([ぽポ]|ﾎﾟ)',
        '[あアｱ]', '[いイｲ]', '[うウｳ]', '[えエｴ]', '[おオｵ]',
        '[かカｶ]', '[きキｷ]', '[くクｸ]', '[けケｹ]', '[こコｺ]',
        '[さサｻ]', '[しシｼ]', '[すスｽ]', '[せセｾ]', '[そソｿ]',
        '[たタﾀ]', '[ちチﾁ]', '[つツﾂ]', '[てテﾃ]', '[とトﾄ]',
        '[なナﾅ]', '[にニﾆ]', '[ぬヌﾇ]', '[ねネﾈ]', '[のノﾉ]',
        '[はハﾊ]', '[ひヒﾋ]', '[ふフﾌ]', '[へヘﾍ]', '[ほホﾎ]',
        '[まマﾏ]', '[みミﾐ]', '[むムﾑ]', '[めメﾒ]', '[もモﾓ]',
        '[やヤﾔ]', '[ゆユﾕ]', '[よヨﾖ]',
        '[らラﾗ]', '[りリﾘ]', '[るルﾙ]', '[れレﾚ]', '[ろロﾛ]',
        '[わワﾜ]', '[をヲｦ]', '[んンﾝ]',
        '[ぁァｧ]', '[ぃィｨ]', '[ぅゥｩ]', '[ぇェｪ]',    '[ぉォｫ]',
        '[っッｯ]', '[ゃャｬ]', '[ゅュｭ]', '[ょョｮ]', '[ゎヮﾜ]'
    ];

    this.caption = {
        // stat       : '{%TOTAL%}件中、{%RESULT%}件の情報が見つかりました。（10件ずつ表示しています）',
        stat       : '{%TOTAL%}件中、{%RESULT%}件の情報が見つかりました。（1ページあたり最大50件表示します）',
        stat_not   : '{%TOTAL%}件中、一致する情報はありません。',
        notfound   : '指定された条件では見つかりませんでした。',
        error      : '検索結果は0件です。',
        navi_first : '←',
        navi_last  : '→',
        navi_prev  : '…',
        navi_next  : '…',
        result_pdf : ' (PDF)'
    };
}

FullTextSearch.prototype = {
    init : function (fullTextData, keyword)
    {
        
        // console.log(keyword);
        this.dataset = fullTextData;
        this.param   = keyword;
        this.bmh   = keyword; //bmh 検索
        this.pbsch   = keyword;  //pbsch 検索
        this.case_place   = keyword;  //case_place 検索
        this.pageNum   = keyword;  //case_place 検索

        this.param_refine1   = keyword;
        this.param_refine2   = keyword;
        this.param_yearfrom   = keyword;
        this.param_yearto   = keyword;
        this.param_hasimage   = keyword;
        this.param_class1   = keyword;
        this.param_class2   = keyword;
        this.param_class3   = keyword;
        
        this.keyword = this.getParam(this.param);
        this.bmh = this.getParam2(this.bmh); //bmh 検索
        this.pbsch = this.getParam3(this.pbsch);  //pbsch 検索
        this.case_place = this.getParam4(this.case_place);  //case_place 検索
        this.pageNum = this.getParam5(this.pageNum);  //case_place 検索
        

        this.refine1 = this.getParam_refine1(this.param_refine1);        //絞り込みキーワード取り出し
        this.refine2 = this.getParam_refine2(this.param_refine2);        //絞り込みキーワード取り出し
        this.yearfrom = this.getParam_yearfrom(this.param_yearfrom);        //絞り込みキーワード取り出し
        this.yearto = this.getParam_yearto(this.param_yearto);        //絞り込みキーワード取り出し
        this.hasimage = this.getParam_hasimage(this.param_hasimage);        //絞り込みキーワード取り出し
        this.class1 = this.getParam_class1(this.param_class1);        //絞り込みキーワード取り出し
        this.class2 = this.getParam_class2(this.param_class2);        //絞り込みキーワード取り出し
        this.class3 = this.getParam_class3(this.param_class3);        //絞り込みキーワード取り出し
    },
    
    
    initElement : function (stat, navi1, navi2, result)
    {
        
        this.st = this.getElement(stat);
        this.re = this.getElement(result);
        this.nv1 = this.getElement(navi1);
        this.nv2 = this.getElement(navi2);
    },

    // キーワード検索関数
    getParam : function (s)
    {
        if (!s) return null;
        s = s.replace(/\+/g, " ");
        var rg = new RegExp('[\?&]' + this.param_name + '\=([^&]*)');
        if (s.match(rg)) s = RegExp.$1;

        switch (this.charset) {
        case 'UTF-8':
            s = UnescapeUTF8(s);
            break;
        case 'SJIS':
            s = UnescapeSJIS(s);
            break;
        case 'EUC':
            s = UnescapeEUCJP(s);
            break;
        }

        return this.splitKeyword(s);
    },


    // BMH　検索関数
    getParam2 : function (s)
    {
        if (!s) return null;
        s = s.replace(/\+/g, " ");
        var rg = new RegExp('[\?&]' + this.param_name2 + '\=([^&]*)');
        if (s.match(rg)) s = RegExp.$1;

        switch (this.charset) {
        case 'UTF-8':
            s = UnescapeUTF8(s);
            break;
        case 'SJIS':
            s = UnescapeSJIS(s);
            break;
        case 'EUC':
            s = UnescapeEUCJP(s);
            break;
        }

        return this.splitKeyword(s);
    },



    // PBSCH　検索関数
    getParam3 : function (s)
    {
        if (!s) return null;
        s = s.replace(/\+/g, " ");
        var rg = new RegExp('[\?&]' + this.param_name3 + '\=([^&]*)');
        if (s.match(rg)) s = RegExp.$1;
        // console.log(s);

        switch (this.charset) {
        case 'UTF-8':
            s = UnescapeUTF8(s);
            break;
        case 'SJIS':
            s = UnescapeSJIS(s);
            break;
        case 'EUC':
            s = UnescapeEUCJP(s);
            break;
        }
        // console.log(this.splitKeyword(s));

        return this.splitKeyword(s);
    },


    
    // cases
    getParam4 : function (s)
    {
        if (!s) return null;
        s = s.replace(/\+/g, " ");
        var rg = new RegExp('[\?&]' + this.param_name4 + '\=([^&]*)');
        if (s.match(rg)) s = RegExp.$1;

        switch (this.charset) {
        case 'UTF-8':
            s = UnescapeUTF8(s);
            break;
        case 'SJIS':
            s = UnescapeSJIS(s);
            break;
        case 'EUC':
            s = UnescapeEUCJP(s);
            break;
        }

        return this.splitKeyword(s);
    },

            
    // cases
    getParam5 : function (s)
    {
        if (!s) return null;
        s = s.replace(/\+/g, " ");
        var rg = new RegExp('[\?&]' + this.param_name5 + '\=([^&]*)');
        if (s.match(rg)) s = RegExp.$1;

        switch (this.charset) {
        case 'UTF-8':
            s = UnescapeUTF8(s);
            break;
        case 'SJIS':
            s = UnescapeSJIS(s);
            break;
        case 'EUC':
            s = UnescapeEUCJP(s);
            break;
        }

        return this.splitKeyword(s);
    },

        



    getParam_refine1 : function (s)    //絞り込みキーの取り出し
    {
        var s_li = [];
        // console.log("처리전 : ",s);  //처리 전 로그
        if (!s) return null;
        s = s.replace(/\+/g, " ");
        // console.log("처리후 : ",s);  //처리 후 로그
        // console.log("this.param_name_refine1 : ",this.param_name_refine1);  //this.param_name_refine1
        
        var rg = new RegExp('[\?&]' + this.param_name_refine1 + '\=([^&]*)');

        if (s.match(rg)) s = RegExp.$1;

        switch (this.charset) {
        case 'UTF-8':
            s = UnescapeUTF8(s);
            break;
        case 'SJIS':
            s = UnescapeSJIS(s);
            break;
        case 'EUC':
            s = UnescapeEUCJP(s);
            break;
        }

        return this.splitKeyword(s);
    },
    getParam_refine2 : function (s)    //絞り込みキーの取り出し
    {
        if (!s) return null;
        s = s.replace(/\+/g, " ");
        var rg = new RegExp('[\?&]' + this.param_name_refine2 + '\=([^&]*)');
        if (s.match(rg)) s = RegExp.$1;

        switch (this.charset) {
        case 'UTF-8':
            s = UnescapeUTF8(s);
            break;
        case 'SJIS':
            s = UnescapeSJIS(s);
            break;
        case 'EUC':
            s = UnescapeEUCJP(s);
            break;
        }

        return this.splitKeyword(s);
    },
    getParam_yearfrom : function (s)    //絞り込みキーの取り出し
    {
        if (!s) return null;
        s = s.replace(/\+/g, " ");
        var rg = new RegExp('[\?&]' + this.param_name_yearfrom + '\=([^&]*)');
        if (s.match(rg)) s = RegExp.$1;

        switch (this.charset) {
        case 'UTF-8':
            s = UnescapeUTF8(s);
            break;
        case 'SJIS':
            s = UnescapeSJIS(s);
            break;
        case 'EUC':
            s = UnescapeEUCJP(s);
            break;
        }

        if (s != 'null') {
            // 数値を文字列として連結する。
            s = '' + s + '0000';
        }

        return this.splitKeyword(s);
    },
    getParam_yearto : function (s)    //絞り込みキーの取り出し
    {
        if (!s) return null;
        s = s.replace(/\+/g, " ");
        var rg = new RegExp('[\?&]' + this.param_name_yearto + '\=([^&]*)');
        if (s.match(rg)) s = RegExp.$1;

        switch (this.charset) {
        case 'UTF-8':
            s = UnescapeUTF8(s);
            break;
        case 'SJIS':
            s = UnescapeSJIS(s);
            break;
        case 'EUC':
            s = UnescapeEUCJP(s);
            break;
        }

        if (s != 'null') {
            // 数値を文字列として連結する。
            s = '' + s + '1231';
        }

        return this.splitKeyword(s);
    },
    getParam_hasimage : function (s)    //絞り込みキーの取り出し
    {
        if (!s) return null;
        s = s.replace(/\+/g, " ");
        var rg = new RegExp('[\?&]' + this.param_name_hasimage + '\=([^&]*)');
        if (s.match(rg)) s = RegExp.$1;

        switch (this.charset) {
        case 'UTF-8':
            s = UnescapeUTF8(s);
            break;
        case 'SJIS':
            s = UnescapeSJIS(s);
            break;
        case 'EUC':
            s = UnescapeEUCJP(s);
            break;
        }

        return this.splitKeyword(s);
    },
    getParam_class1 : function (s)    //絞り込みキーの取り出し
    {
        if (!s) return null;
        s = s.replace(/\+/g, " ");
        var rg = new RegExp('[\?&]' + this.param_name_class1 + '\=([^&]*)');
        if (s.match(rg)) s = RegExp.$1;

        switch (this.charset) {
        case 'UTF-8':
            s = UnescapeUTF8(s);
            break;
        case 'SJIS':
            s = UnescapeSJIS(s);
            break;
        case 'EUC':
            s = UnescapeEUCJP(s);
            break;
        }

        return this.splitKeyword(s);
    },
    getParam_class2 : function (s)    //絞り込みキーの取り出し
    {
        if (!s) return null;
        s = s.replace(/\+/g, " ");
        var rg = new RegExp('[\?&]' + this.param_name_class2 + '\=([^&]*)');
        if (s.match(rg)) s = RegExp.$1;

        switch (this.charset) {
        case 'UTF-8':
            s = UnescapeUTF8(s);
            break;
        case 'SJIS':
            s = UnescapeSJIS(s);
            break;
        case 'EUC':
            s = UnescapeEUCJP(s);
            break;
        }

        return this.splitKeyword(s);
    },
    getParam_class3 : function (s)    //絞り込みキーの取り出し
    {
        if (!s) return null;
        s = s.replace(/\+/g, " ");
        var rg = new RegExp('[\?&]' + this.param_name_class3 + '\=([^&]*)');
        if (s.match(rg)) s = RegExp.$1;

        switch (this.charset) {
        case 'UTF-8':
            s = UnescapeUTF8(s);
            break;
        case 'SJIS':
            s = UnescapeSJIS(s);
            break;
        case 'EUC':
            s = UnescapeEUCJP(s);
            break;
        }

        return this.splitKeyword(s);
    },
    splitKeyword : function (s)
    {
        // console.log(s);
        s = s.replace(/　/g, " ");
        s = s.replace(/\s+/g, " ");

        s = s.split(" ");
        // console.log(s);
        return s;
    }
    ,
    splitKeyword2 : function (s)
    {
        // console.log(s);
        s = s.replace(/　/g, " ");
        s = s.replace(/\s+/g, " ");

        s = s.split(" ");
        console.log(s);
        return s;
    }
    ,
    getQueryParamValue : function (name, charset)
    {
        var s = document.location.search;

        if (!s) return '';

        if (!charset) charset = '';

        s = s.replace(/\+/g, " ");
        var rg = new RegExp('[\?&]' + name + '\=([^&]*)');
        if (s.match(rg)) {
            s = RegExp.$1;
        } else {
            return '';
        }

        switch (charset.toUpperCase()) {
        case 'UTF-8':
        case 'UTF8':
            s = UnescapeUTF8(s);
            break;
        case 'SJIS':
            s = UnescapeSJIS(s);
            break;
        case 'EUC':
            s = UnescapeEUCJP(s);
            break;
        }

        return s;
    }
    ,
    getElement : function (idx)
    {
        var element = document.getElementById(idx);
        if (element == null) {
            throw '#' + idx + 'の要素が存在しません。';
        }
        return element;
    }
    ,
    reg_escape : function (s)
    {
        return s.replace(/[\.\,\[\]\?\*\/\{\}\+\^\(\)\|\:\$\\]/g,
            function () {
                var a = arguments;
                a[0] = '\\' + a[0];
                return a[0];
            }
        );
    }
    ,
    reg_optimize : function (q)
    {
        var _q  = [];
        for (var i = 0; i < q.length; i++) {
            q[i] = this.reg_escape(q[i]);
        }

        if (this.refine2) {
            for (var i = 0; i < q.length; i++) {
                if (q[i] == '') continue;
                var r = new RegExp(q[i]);
                var f = 0;
                for (var j = 0; j < q.length; j++) {
                    if (j == i) continue;
                    if (q[j].match(r)) {
                        if (q[j] == q[i]) {
                            q[j] = '';
                        } else {
                            f = 1;
                            break;
                        }
                    }
                }
                if (f == 0) _q.push(q[i]);
            }
        } else {
            for (var i = 0; i < q.length; i++) {
                if (q[i] == '') continue;
                var r = new RegExp(q[i]);
                var f = 0;
                for (var j = 0; j < q.length; j++) {
                    if (j == i) continue;
                    if (q[j] == q[i]) {
                        q[j] = '';
                    }
                }
                if (f == 0) _q.push(q[i]);
            }
        }

        return _q;
    },





    reg_optimize2 : function (q)
    {
        var _q  = [];
        // console.log(q);
        for (var i = 0; i < q.length; i++) {
            q[i] = this.reg_escape(q[i]);
        }
        // console.log(q);

        if (this.refine2) {
            for (var i = 0; i < q.length; i++) {
                // console.log(q);
                if (q[i] == '') continue;
                var r = new RegExp(q[i]);
                // console.log(r);
                var f = 0;
                for (var j = 0; j < q.length; j++) {
                    if (j == i) continue;
                    // if (q[j].match(r)) {
                    //     if (q[j] == q[i]) {
                    //         q[j] = '';
                    //     } else {
                    //         f = 1;
                    //         break;
                    //     }
                    // }
                }
                if (f == 0) _q.push(q[i]);
                // console.log(_q);
            }
        } else {
            for (var i = 0; i < q.length; i++) {
                if (q[i] == '') continue;
                var r = new RegExp(q[i]);
                var f = 0;
                for (var j = 0; j < q.length; j++) {
                    if (j == i) continue;
                    if (q[j] == q[i]) {
                        q[j] = '';
                    }
                }
                if (f == 0) _q.push(q[i]);
            }
        }
        // console.log(_q);
        return _q;
    },





    ignore_ULHZ : function (aimai)        //ULHZ無視？
    {
        var str = '';
        for (var i = 0, len_i = aimai.length; i < len_i; i++) {
            var c     = aimai.substr(i, 1);
            var cnext = aimai.substr(i + 1, 1);
            var cc    = (cnext == 'ﾞ' || cnext == 'ﾟ' ? c + cnext : null);
            for (var j = 0, len_j = this.case_array.length; j < len_j; j++) {
                var reg = new RegExp(this.case_array[j]);
                if (cc && cc.match(reg)) {
                    c = this.case_array[j];
                    i++;
                    break;
                } else if (c.match(reg)) {
                    c = this.case_array[j];
                    break;
                }
            }
            str += c;
        }
        return str;
    }
    ,
    ignore_case : function ()
    {
        var a = arguments;
        return "[" + a[0].toLowerCase() + a[0].toUpperCase() + "]";
    }
    ,
    ignore_number : function (aimai)
    {
        var str = '';
        for (var i = 0; i < aimai.length; i++) {
            var c = aimai.substr(i, 1);
            switch (c) {
            case '0' : str += "[0０]"; break;
            case '1' : str += "[1１]"; break;
            case '2' : str += "[2２]"; break;
            case '3' : str += "[3３]"; break;
            case '4' : str += "[4４]"; break;
            case '5' : str += "[5５]"; break;
            case '6' : str += "[6６]"; break;
            case '7' : str += "[7７]"; break;
            case '8' : str += "[8８]"; break;
            case '9' : str += "[9９]"; break;
            case '０': str += "[0０]"; break;
            case '１': str += "[1１]"; break;
            case '２': str += "[2２]"; break;
            case '３': str += "[3３]"; break;
            case '４': str += "[4４]"; break;
            case '５': str += "[5５]"; break;
            case '６': str += "[6６]"; break;
            case '７': str += "[7７]"; break;
            case '８': str += "[8８]"; break;
            case '９': str += "[9９]"; break;
            default: str += c;
            }
        }
        return str;
    }
    ,
    reset_result : function ()
    {
        this.st.innerHTML = '';
        this.re.innerHTML = '検索中・・・';
        this.nv1.innerHTML = '';
        this.nv2.innerHTML = '';
    }
    ,

    // 一般キーワードが入る
    do_find : function (keyword,bmh,pbsch,cases,refine1,refine2,yearfrom,yearto,hasimage,class1,class2,class3)
    {
        // console.log(keyword);
        

        if (this.lastquery == keyword) return;
        if (this.lastquery == bmh) return; //bmh 検索時
        if (this.lastquery == pbsch) return; //pbsch 検索時
        if (this.lastquery == cases) return; //cases 検索時

        this.lastquery = keyword;
        this.lastquery = bmh; //bmh 検索時
        this.lastquery = pbsch; //pbsch 検索時
        this.lastquery = cases; //cases 検索時

        var re = this.find(keyword,bmh,pbsch,cases,refine1,refine2,yearfrom,yearto,hasimage,class1,class2,class3);

        this.set_st(re);


        this.pagenavi(re, this.nv1);
        this.pagenavi(re, this.nv2);
        this.view(re);
    }
    ,
    find : function (keyword,bmh,pbsch,cases,refine1,refine2,yearfrom,yearto,hasimage,class1,class2,class3)
    {
        
        // console.log(pbsch);
        if (!refine1) return [];
        if (!refine2) return [];
        if (!yearfrom) return [];
        if (!yearto) return [];
        if (!hasimage) return [];
        if (!class1) return [];
        if (!class2) return [];
        if (!class3) return [];

        var query = null;
        var query2 = null; //bmh 検索時
        var query3 = null; //pbsch 検索時
        var query4 = null; //cases 検索時

        if (keyword != ""){
        //キーワード入力ありの場合
            query= this.splitKeyword(keyword);
        }

        //bmh入力ありの場合
        if (bmh != ""){
            query2= this.splitKeyword(bmh);
        }

        //pbsch入力ありの場合
        if (pbsch != ""){
            query3= this.splitKeyword(pbsch);
            // console.log(query3);
        }

        
        //cases入力ありの場合
        if (cases != ""){
            query4= this.splitKeyword(cases);
            // console.log(query4);
        }




        // -------------------------------여기까지 수정했음 -----------------------------------------

        var query_refine1 = this.splitKeyword(refine1);    //形態： 値がない場合が未対応。refine1=nullを、絶対入れる事。
        var query_refine2 = this.splitKeyword(refine2);    //作成年代： 値がない場合が未対応。refine2=nullを、絶対入れる事。
        var query_yearfrom = this.splitKeyword(yearfrom);  //年（From）： 値がない場合が未対応。yearfrom=nullを、絶対入れる事。
        var query_yearto = this.splitKeyword(yearto);      //年（To）： 値がない場合が未対応。yearto=nullを、絶対入れる事。
        var query_hasimage = this.splitKeyword(hasimage);  //画像有無： 値がない場合が未対応。hasimage=nullを、絶対入れる事。
        var query_class1 = class1;
        var query_class2 = class2;
        var query_class3 = class3;

        // Keyword Search 変数宣言
        var reg    = [];
        var reg_g  = [];
        var reg_s  = [];

        // BMH Search 変数宣言
        var reg2    = [];
        var reg_g2  = [];
        var reg_s2  = [];

        // PBSCH Search 変数宣言
        var reg3    = [];
        var reg_g3  = [];
        var reg_s3  = [];

        
        // cases Search 変数宣言
        var reg4    = [];
        var reg_g4  = [];
        var reg_s4  = [];


        var result_original = [];
        var result = [];
        var result2 = [];　// BMH Search 変数宣言
        var result3 = [];　// PBSCH Search 変数宣言
        var result4 = [];　// cases Search 変数宣言

        var aimai;
        var aimai2;　// BMH Search 変数宣言
        var aimai3;　// PBSCH Search 変数宣言
        var aimai4;　// cases Search 変数宣言

        var aimai_array = [];
        var aimai_array2 = [];　// BMH Search 変数宣言
        var aimai_array3 = [];　// PBSCH Search 変数宣言
        var aimai_array4 = [];　// cases Search 変数宣言

        if (query_yearfrom == 'null' && query_yearto != 'null'){
            query_yearfrom = '00000000';
        }
        if (query_yearfrom != 'null' && query_yearto == 'null'){
            query_yearto = '99999999';
        }

        if (query) {
        //キーワード入力ありの場合
            query = this.reg_optimize(query);
            for (var i = 0; i < query.length; i++) {
                if (query[i] == '') continue;
                if (this.zenhan) {
                    aimai = this.ignore_ULHZ(query[i]);
                } else {
                    aimai = query[i].replace(/[a-zA-Z]/g, this.ignore_case);
                    aimai = this.ignore_number(aimai);
                }
                aimai_array.push(aimai);
                try {
                    var qr   = new RegExp(aimai);
                    var qr_g = new RegExp(aimai, 'g');
                    reg.push(qr);
                    reg_g.push(qr_g);
                } catch (e) {
                    reg.push(/(.)/);
                }
            }
        } else {
            reg.push(/(.)/);
        }





        // -------------- BMH入力ありの場合 --------------
        if (query2) {
            query2 = this.reg_optimize(query2);
                for (var i = 0; i < query2.length; i++) {
                    if (query2[i] == '') continue;
                    if (this.zenhan) {
                        aimai2 = this.ignore_ULHZ(query2[i]);
                    } else {
                        aimai2 = query2[i].replace(/[a-zA-Z]/g, this.ignore_case);
                        aimai2 = this.ignore_number(aimai2);
                    }
                    aimai_array2.push(aimai2);
                    try {
                        var qr2   = new RegExp(aimai2);
                        var qr_g2 = new RegExp(aimai2, 'g');
                        reg2.push(qr2);
                        reg_g2.push(qr_g2);
                    } catch (e) {
                        reg2.push(/(.)/);
                    }
                }
                // console.log(reg_g);
            } else {
                reg2.push(/(.)/);
            }







            
        // -------------- PBSCH入力ありの場合 --------------
        if (query3) {
            query3 = this.reg_optimize2(query3);
            // console.log('query3 : ', query3);
                for (var i = 0; i < query3.length; i++) {
                    if (query3[i] == '') continue;
                    if (this.zenhan) {
                        aimai3 = this.ignore_ULHZ(query3[i]);
                        // console.log(aimai3);
                    } else {
                        aimai3 = query3[i].replace(/[a-zA-Z]/g, this.ignore_case);
                        aimai3 = this.ignore_number(aimai3);
                        // console.log(aimai3);
                    }
                    aimai_array3.push(aimai3);
                    try {
                        var qr3   = new RegExp(aimai3);
                        var qr_g3 = new RegExp(aimai3, 'g');
                        reg3.push(qr3);
                        reg_g3.push(qr_g3);
                    } catch (e) {
                        reg3.push(/(.)/);
                    }
                }
                // console.log(reg_g3);
                // console.log(reg3);
                // console.log(aimai3);
            } else {
                reg3.push(/(.)/);
            }
            // console.log(aimai_array3.includes("通知", "医療委員会通知"));

            if (aimai_array3.includes("安全情報", "緊急安全情報") == true) {
                delete aimai_array3[0];
                // aimai_array3[0] == '安全情報'

                // 여기서 부터 확인해야 함 -------------------------01.05
            } else if (aimai_array3.includes("通知", "医療委員会通知") == true) {
                delete aimai_array3[1];
            }

            aimai_array3  = aimai_array3.filter(function(item) {
                return item !== null && item !== undefined && item !== '';
            });
            // console.log(aimai_array3);





            
        // -------------- cases入力ありの場合 --------------
        if (query4) {
            query4 = this.reg_optimize(query4);
                for (var i = 0; i < query4.length; i++) {
                    if (query4[i] == '') continue;
                    if (this.zenhan) {
                        aimai4 = this.ignore_ULHZ(query4[i]);
                    } else {
                        aimai4 = query4[i].replace(/[a-zA-Z]/g, this.ignore_case);
                        aimai4 = this.ignore_number(aimai4);
                    }
                    aimai_array4.push(aimai4);
                    try {
                        var qr4   = new RegExp(aimai4);
                        var qr_g4 = new RegExp(aimai4, 'g');
                        reg4.push(qr4);
                        reg_g4.push(qr_g4);
                    } catch (e) {
                        reg4.push(/(.)/);
                    }
                }
                // console.log(reg_g4);
            } else {
                reg4.push(/(.)/);
            }
            // console.log(aimai_array4);







        //キーワード複数指定の場合
        if (aimai_array.length > 1) {
            for (var i = 0, aimai_length = aimai_array.length; i < aimai_length; i++) {
                var tmp = [aimai_array[i]];
                for (var j = 0; j < aimai_length; j++) {
                    if (i == j) continue;
                    tmp.push(aimai_array[j]);
                    reg_s[reg_s.length] = {
                        reg   : new RegExp(tmp.join('')),    //joinで、
                        reg_g : new RegExp(tmp.join(''), 'g'),
                        len   : tmp.length,
                        point : 10
                    };
                }
            }
        }




        // console.log(aimai_array2.length);

        // ------------ BMH複数指定の場合 ------------
        if (aimai_array2.length > 1) {
            for (var i = 0, aimai_length2 = aimai_array2.length; i < aimai_length2; i++) {
                var tmp2 = [aimai_array2[i]];
                for (var j = 0; j < aimai_length2; j++) {
                    if (i == j) continue;
                    tmp2.push(aimai_array2[j]);
                    reg_s2[reg_s2.length] = {
                        reg2   : new RegExp(tmp2.join('')),    //joinで、
                        reg_g2 : new RegExp(tmp2.join(''), 'g'),
                        len   : tmp2.length,
                        point : 10
                    };
                }
            }
            // console.log(reg_g2);
        }



        // console.log(aimai_array3.length);
        // console.log(aimai_array3);
        // ------------ PBSCH複数指定の場合 ------------
        if (aimai_array3.length >= 1) {
            // console.log('これが出るかな');
            for (var i = 0, aimai_length3 = aimai_array3.length; i < aimai_length3; i++) {
                // console.log('これが出るかな');
                var tmp3 = [aimai_array3[i]];
                // console.log(tmp3);
                for (var j = 0; j < aimai_length3; j++) {
                    // console.log('これが出るかな');
                    if (aimai_array3.length > 1) {
                        if (i == j) continue;
                    }
                    
                    tmp3.push(aimai_array3[j]);

                    reg_s3[reg_s3.length] = {
                        reg3   : new RegExp(tmp3.join('')),    //joinで、
                        reg_g3 : new RegExp(tmp3.join(''), 'g'),
                        len   : tmp3.length,
                        point : 10
                    };
                    // console.log(new RegExp(tmp3.join('')));
                }
            }
            // console.log(reg_g3);
        }
        // console.log(reg_g3);

        

        // ------------ cases複数指定の場合 ------------
        if (aimai_array4.length > 1) {
            for (var i = 0, aimai_length4 = aimai_array4.length; i < aimai_length4; i++) {
                var tmp4 = [aimai_array4[i]];
                for (var j = 0; j < aimai_length4; j++) {
                    if (i == j) continue;
                    tmp4.push(aimai_array4[j]);
                    reg_s4[reg_s4.length] = {
                        reg4   : new RegExp(tmp4.join('')),    //joinで、
                        reg_g4 : new RegExp(tmp4.join(''), 'g'),
                        len   : tmp4.length,
                        point : 10
                    };
                }
            }
            // console.log(reg_g4);
        }







        var d_key = ['title','body', 'body2','body3', 'body4', 'body5', 'author', 'receiver', 'subkey', 'remarks', 'secbody', 'secbody2', 'trititle', 'tribody', 'tribody2', 'create_date', 'year'];

        var d_key2 = ['type']; //BMH　検索時！
        var d_key3 = ['state', 'state2']; //PBSCH　検索時！
        var d_key4 = ['place']; //cases　検索時！

        var d_pnt = [20,       1,       1];
        var d_pnt_pdf = 5;

        var d_pnt2 = []; //BMH　検索時！
        var d_pnt3 = []; ////PBSCH　検索時！
        var d_pnt4 = []; ////cases　検索時！

        //検索メイン（dataset.lengthが、DBのデータ数）
        for (var i = 0, d_len = this.dataset.length; i < d_len; i++) {
            // console.log(rg3);
            var r, rg;
            var r2, rg2; //BMH 検索時
            var r3, rg3; //PBSCH 検索時
            var r4, rg4; //cases 検索時

            var d_length = 0;
            var d_length2 = 0;//BMH 検索時
            var d_length3 = 0;//PBSCH 検索時
            var d_length4 = 0;//cases 検索時

            var rg_len = 0;
            var rg_pos = null;
            var rg_per = 0;
            var rg_cnt = 0;
            var rg_pnt = 0;

            //BMH 検索時
            var rg_len2 = 0;
            var rg_pos2 = null;
            var rg_per2 = 0;
            var rg_cnt2 = 0;
            var rg_pnt2 = 0;

            //PBSCH 検索時
            var rg_len3 = 0;
            var rg_pos3 = null;
            var rg_per3 = 0;
            var rg_cnt3 = 0;
            var rg_pnt3 = 0;

            
            //case 検索時
            var rg_len4 = 0;
            var rg_pos4 = null;
            var rg_per4 = 0;
            var rg_cnt4 = 0;
            var rg_pnt4 = 0;


            var res = [];
            var res2 = [];//BMH 検索時
            var res3 = [];//PBSCH 検索時
            var res4 = [];//cases 検索時


            var idx_len_title = [];
            var idx_len_body  = [];
            var idx_len_age  = [];

            //キーワード複数指定の場合
            if (reg_s.length > 0) {
                for (var j = 0; j < d_key.length; j++) {
                    for (var k = 0; k < reg_s.length; k++) {    //reg_sは、

                        r = this.dataset[i][d_key[j]].match(reg_s[k].reg);    //DB[n個目][項目]が、aimai_arrayの結合

                        // console.log(r);
                        //（キーワード以外の）検索条件と一致しているか判定
                        var is_target = this.judge_target(
                                i,
                                query_refine1,
                                query_refine2,
                                query_yearfrom,
                                query_yearto,
                                query_hasimage,
                                query_class1,
                                query_class2,
                                query_class3
                            );

                        if (r && is_target && r.index != -1) {
                            rg = this.dataset[i][d_key[j]].match(reg_s[k].reg_g);
                            rg_pnt += (rg.length + reg_s[k].len) * reg_s[k].point;
                            res.push([r, d_key[j]]);
                        }
                    }
                }
            }
            // console.log(res);
            // console.log(reg_s2.length);


// --------------------------------- OK -------------------------------------
            //BMHの複数指定の場合
            if (reg_s2.length > 0) {
                // console.log(reg_s2[0].reg2);
                for (var p = 0; p < d_key2.length; p++) {
                    for (var k = 0; k < reg_s2.length; k++) {    //reg_sは、

                        r2 = this.dataset[i][d_key2[p]].match(reg_s2[k].reg2);    //DB[n個目][項目]が、aimai_arrayの結合

                        // console.log(r2);
                        //（キーワード以外の）検索条件と一致しているか判定
                        var is_target2 = this.judge_target(
                                i,
                                query_refine1,
                                query_refine2,
                                query_yearfrom,
                                query_yearto,
                                query_hasimage,
                                query_class1,
                                query_class2,
                                query_class3
                            );

                        if (r2 && is_target2 && r2.index != -1) {
                            rg2 = this.dataset[i][d_key2[p]].match(reg_s2[k].reg_g2);
                            rg_pnt2 += (rg2.length + reg_s2[k].len) * reg_s2[k].point;
                            res2.push([r2, d_key2[p]]);
                        }
                    }
                }
            }
            // console.log(rg2);
            



            // console.log(reg_s3);
            // console.log(this.dataset[i][d_key3[0]].match(reg_s3[0].reg3);
            //PBSCHの複数指定の場合
            if (reg_s3.length > 0) {
                // console.log(reg_s3[0]);
                for (var p = 0; p < d_key3.length; p++) {
                    for (var k = 0; k < reg_s3.length; k++) {    //reg_sは、
                        // console.log('ここになるの？');
                        r3 = this.dataset[i][d_key3[p]].match(reg_s3[k].reg3);    //DB[n個目][項目]が、aimai_arrayの結合
                        // console.log(r3);
                        //（キーワード以外の）検索条件と一致しているか判定
                        var is_target3 = this.judge_target(
                                i,
                                query_refine1,
                                query_refine2,
                                query_yearfrom,
                                query_yearto,
                                query_hasimage,
                                query_class1,
                                query_class2,
                                query_class3
                            );
                            // console.log(r3);
                        if (r3 && is_target3 && r3.index != -1) {
                            console.log('r3가 있는 경우만 출력');
                            // console.log(reg_s3[k].reg_g3);
                            rg3 = this.dataset[i][d_key3[p]].match(reg_s3[k].reg_g3);
                            rg_pnt3 += (rg3.length + reg_s3[k].len) * reg_s3[k].point;
                            res3.push([r3, d_key3[p]]);
                        }
                    }
                }
            }
            // console.log(res3);




            //casesの複数指定の場合
            if (reg_s4.length > 0) {
                for (var p = 0; p < d_key4.length; p++) {
                    for (var k = 0; k < reg_s4.length; k++) {    //reg_sは、

                        r4 = this.dataset[i][d_key4[p]].match(reg_s4[k].reg4);    //DB[n個目][項目]が、aimai_arrayの結合

                        // console.log(r2);
                        //（キーワード以外の）検索条件と一致しているか判定
                        var is_target4 = this.judge_target(
                                i,
                                query_refine1,
                                query_refine2,
                                query_yearfrom,
                                query_yearto,
                                query_hasimage,
                                query_class1,
                                query_class2,
                                query_class3
                            );

                        if (r4 && is_target4 && r4.index != -1) {
                            rg4 = this.dataset[i][d_key4[p]].match(reg_s4[k].reg_g4);
                            rg_pnt4 += (rg4.length + reg_s4[k].len) * reg_s4[k].point;
                            res4.push([r4, d_key4[p]]);
                        }
                    }
                }
            }
            // console.log(this.dataset);









            //キーワード1語ごとの処理
            for (var j = 0; j < reg.length; j++) {
                var chk = false;

                //DB、1件の各項目ごとの処理
                for (var k = 0; k < d_key.length; k++) {
                    d_length += this.dataset[i][d_key[k]].length;

                    if (keyword != ""){
                    //キーワード入力ありの場合
                        r = this.dataset[i][d_key[k]].match(reg[j]);
                    } else {
                    //キーワード入力なしの場合
                        r = this.dataset[i][d_key[k]];
                    }

                    //（キーワード以外の）検索条件と一致しているか判定
                    var is_target = this.judge_target(
                            i,
                            query_refine1,
                            query_refine2,
                            query_yearfrom,
                            query_yearto,
                            query_hasimage,
                            query_class1,
                            query_class2,
                            query_class3
                        );

                    if (r && is_target && r.index != -1) {
                        rg = this.dataset[i][d_key[k]].match(reg_g[j]);
                        rg_len += rg.length;
                        rg_cnt += rg.length * r[0].length;
                        if (rg_pos == null || rg_pos > r.index) rg_pos = r.index;
                        rg_pnt += d_pnt[k] * rg.length;
                        if (this.dataset[i].type == 'pdf') rg_pnt += d_pnt_pdf;
                        res.push([r, d_key[k]]);
                        chk = true;
                    }
                }
                if (this.refine2 && !chk) {
                    res = [];
                    break;
                }
                // console.log(res);
            }
            // console.log(keyword);





            // console.log(reg2.length);
            // --------------- BMH 1語ごとの処理 ---------------
            for (var j = 0; j < reg2.length; j++) {
                var chk2 = false;

                //DB、1件の各項目ごとの処理
                for (var k = 0; k < d_key2.length; k++) {
                    d_length2 += this.dataset[i][d_key2[k]].length;

                    if (bmh != ""){
                    //キーワード入力ありの場合
                        r2 = this.dataset[i][d_key2[k]].match(reg2[j]);
                        // console.log(r2);
                    } else {
                    //キーワード入力なしの場合
                    // !!----------- 여기를 'r2'로 바꾸면 에러 발생 ---------------!!
                        r = this.dataset[i][d_key2[k]];
                    }

                    //（キーワード以外の）検索条件と一致しているか判定
                    var is_target2 = this.judge_target(
                            i,
                            query_refine1,
                            query_refine2,
                            query_yearfrom,
                            query_yearto,
                            query_hasimage,
                            query_class1,
                            query_class2,
                            query_class3
                        );

                    if (r2 && is_target2 && r2.index != -1) {
                        rg2 = this.dataset[i][d_key2[k]].match(reg_g2[j]);
                        // console.log(rg2);
                        rg_len2 += rg2.length;
                        rg_cnt2 += rg2.length * r2[0].length;
                        if (rg_pos2 == null || rg_pos2 > r2.index) rg_pos2 = r2.index;
                        // console.log(rg_pos2);
                        rg_pnt2 += d_pnt2[k] * rg2.length;
                        if (this.dataset[i].type == 'pdf') rg_pnt2 += d_pnt_pdf2;
                        res2.push([r2, d_key2[k]]);
                        chk2 = true;
                    }
                }
                if (this.type && !chk2) {
                    res2 = [];
                    break;
                }
                // console.log(res);
            }
            // console.log(res2);











            // console.log(reg3.length);
            // console.log(reg3);
            // --------------- PBSCH 1語ごとの処理 ---------------
            for (var j = 0; j < reg3.length; j++) {
                var chk3 = false;
                // console.log(reg3);

                //DB、1件の各項目ごとの処理
                for (var k = 0; k < d_key3.length; k++) {
                    d_length3 += this.dataset[i][d_key3[k]].length;

                    if (pbsch != ""){
                    //キーワード入力ありの場合
                        // console.log(reg3[j]);
                        // console.log(this.dataset[i][d_key3[k]]);
                        r3 = this.dataset[i][d_key3[k]].match(reg3[j]);
                        // console.log(r3);
                    } else {
                    //キーワード入力なしの場合
                    // !!----------- 여기를 'r2'로 바꾸면 에러 발생 ---------------!!
                        r3 = this.dataset[i][d_key3[k]];
                        // console.log(r);
                    }

                    //（キーワード以外の）検索条件と一致しているか判定
                    var is_target3 = this.judge_target(
                            i,
                            query_refine1,
                            query_refine2,
                            query_yearfrom,
                            query_yearto,
                            query_hasimage,
                            query_class1,
                            query_class2,
                            query_class3
                        );

                    if (r3 && is_target3 && r3.index != -1) {
                        rg3 = this.dataset[i][d_key3[k]].match(reg_g3[j]);
                        // console.log(rg3);
                        
                        rg_len3 += rg3.length;
                        rg_cnt3 += rg3.length * r3[0].length;
                        // console.log(rg_len3);
                        if (rg_pos3 == null || rg_pos3 > r3.index) rg_pos3 = r3.index;
                        rg_pnt3 += d_pnt3[k] * rg3.length;
                        if (this.dataset[i].type == 'pdf') rg_pnt3 += d_pnt_pdf3;

                        // console.log(r3);


                        if (r3.index == 0) {
                            res3.push([r3, d_key3[k]]);
                        }
                        // res3.push([r3, d_key3[k]]);
                        chk3 = true;
                    }
                }
                if (this.type && !chk3) {
                    res3 = [];
                    break;
                }
                // console.log(res3);
            }
            // console.log(res3);



            

            
            // --------------- cases 1語ごとの処理 ---------------
            for (var j = 0; j < reg4.length; j++) {
                var chk4 = false;

                //DB、1件の各項目ごとの処理
                for (var k = 0; k < d_key4.length; k++) {
                    d_length4 += this.dataset[i][d_key4[k]].length;

                    if (cases != ""){
                    //キーワード入力ありの場合
                        r4 = this.dataset[i][d_key4[k]].match(reg4[j]);
                        // console.log(r3);
                    } else {
                    //キーワード入力なしの場合
                    // !!----------- 여기를 'r2'로 바꾸면 에러 발생 ---------------!!
                        r = this.dataset[i][d_key4[k]];
                        // console.log(r);
                    }

                    //（キーワード以外の）検索条件と一致しているか判定
                    var is_target4 = this.judge_target(
                            i,
                            query_refine1,
                            query_refine2,
                            query_yearfrom,
                            query_yearto,
                            query_hasimage,
                            query_class1,
                            query_class2,
                            query_class3
                        );

                    if (r4 && is_target4 && r4.index != -1) {
                        rg4 = this.dataset[i][d_key4[k]].match(reg_g4[j]);
                        rg_len4 += rg4.length;
                        rg_cnt4 += rg4.length * r4[0].length;
                        if (rg_pos4 == null || rg_pos4 > r4.index) rg_pos4 = r4.index;
                        rg_pnt4 += d_pnt4[k] * rg4.length;
                        if (this.dataset[i].type == 'pdf') rg_pnt4 += d_pnt_pdf4;
                        res4.push([r4, d_key4[k]]);
                        chk4 = true;
                    }
                }
                if (this.type && !chk4) {
                    res4 = [];
                    break;
                }
                // console.log(res3);
            }
            // console.log(res4[0]);






            if (!res || res.length == 0) continue;
            rg_per = Math.round(rg_cnt / (d_length) * 100000) / 1000;
            // console.log(rg_per);

            for (var j = 0; j < res.length; j++) {
                if (res[j][1] == 'title') {
                    idx_len_title[idx_len_title.length] = [res[j][0].index, res[j][0][0].length];
                } if (res[j][1] == 'body') {
                    idx_len_body[idx_len_body.length]   = [res[j][0].index, res[j][0][0].length];
                } if (res[j][1] == 'year') {
                    idx_len_age[idx_len_age.length]   = [res[j][0].index, res[j][0][0].length];
                }
            }
            result[result.length] = [i, idx_len_title, idx_len_body, idx_len_age, rg_len, rg_pos, rg_per, rg_pnt];
            result_original[result.length] = [i, idx_len_title, idx_len_body, idx_len_age, rg_len, rg_pos, rg_per, rg_pnt];
            // console.log(result);
            // console.log(res4.length);
            // console.log(res4[0]);

        
            // console.log(res2.length);
            // BMH 検索時
            // if (!res2 || res2.length == 0 || !res3 || res3.length == 0 || !res4 || res4.length == 0) {
            if (!res2 || res2.length == 0) {
                // console.log('여기 걸리면 안되는데');
                // continue;
                if (!res3 || res3.length == 0) {
                    // console.log('여기 걸리면 안되는데');
                    // continue;
                    if (!res4 || res4.length == 0) {
                        // console.log('여기 걸리면 안되는데');
                        continue;
                    } else if (res4 && res4.length <= 1) {
                        rg_per4 = Math.round(rg_cnt4 / (d_length4) * 100000) / 1000;
                        result4[result4.length] = [i, rg_len4, rg_pos4, rg_per4, rg_pnt4];
                        // console.log('ここだよ');
                    }
                } else if (res3 && res3.length <= 1) {
                    rg_per3 = Math.round(rg_cnt3 / (d_length3) * 100000) / 1000;
                    result3[result3.length] = [i, rg_len3, rg_pos3, rg_per3, rg_pnt3];
                    // console.log(result3);
                    // console.log('ここだよ');
                    if (!res4 || res4.length == 0) {
                        // console.log('여기 걸리면 안되는데');
                        continue;
                    } else if (res4 && res4.length <= 1) {
                        rg_per4 = Math.round(rg_cnt4 / (d_length4) * 100000) / 1000;
                        result4[result4.length] = [i, rg_len4, rg_pos4, rg_per4, rg_pnt4];
                        // console.log('ここだよ');
                    }
                }
                // console.log(result3);
            // } else if (res2 || res2.length <= 1 && res3 || res3.length <= 1 && res4 || res4.length <= 1) {
            } else if (res2 && res2.length <= 1) {
                rg_per2 = Math.round(rg_cnt2 / (d_length2) * 100000) / 1000;
                result2[result2.length] = [i, rg_len2, rg_pos2, rg_per2, rg_pnt2];

                if (!res3 || res3.length == 0) {
                    // console.log('여기 걸리면 안되는데');
                    // continue;
                    if (!res4 || res4.length == 0) {
                        // console.log('여기 걸리면 안되는데');
                        continue;
                    } else if (res4 && res4.length <= 1) {
                        rg_per4 = Math.round(rg_cnt4 / (d_length4) * 100000) / 1000;
                        result4[result4.length] = [i, rg_len4, rg_pos4, rg_per4, rg_pnt4];
                        // console.log('ここだよ');
                    }

                } else if (res3 && res3.length <= 1) {
                    rg_per3 = Math.round(rg_cnt3 / (d_length3) * 100000) / 1000;
                    result3[result3.length] = [i, rg_len3, rg_pos3, rg_per3, rg_pnt3];
                    // console.log('ここだよ');
                    if (!res4 || res4.length == 0) {
                        // console.log('여기 걸리면 안되는데');
                        continue;
                    } else if (res4 && res4.length <= 1) {
                        rg_per4 = Math.round(rg_cnt4 / (d_length4) * 100000) / 1000;
                        result4[result4.length] = [i, rg_len4, rg_pos4, rg_per4, rg_pnt4];
                        // console.log('ここだよ');
                    }
                }
                // console.log(result3);
                // console.log('ここだよ');
                // rg_per3 = Math.round(rg_cnt3 / (d_length3) * 100000) / 1000;
                // result3[result3.length] = [i, rg_len3, rg_pos3, rg_per3, rg_pnt3];
                // rg_per4 = Math.round(rg_cnt4 / (d_length4) * 100000) / 1000;
                // result4[result4.length] = [i, rg_len4, rg_pos4, rg_per4, rg_pnt4];
            }
            // console.log(result2);



            // if (!res3 || res3.length == 0) {
            //     // console.log('여기 걸리면 안되는데');
            //     continue;
            // } else if (res3 && res3.length <= 1) {
            //     rg_per3 = Math.round(rg_cnt3 / (d_length3) * 100000) / 1000;
            //     result3[result3.length] = [i, rg_len3, rg_pos3, rg_per3, rg_pnt3];
            //     // console.log(result3);
            //     // console.log('ここだよ');
            // }
            // console.log(result3);






            


            // if (!res3 || res3.length == 0) {
            //     // console.log('여기 걸리면 안되는데');
            //     continue;
            // } else if (res3 && res3.length <= 1) {
            //     rg_per3 = Math.round(rg_cnt3 / (d_length3) * 100000) / 1000;
            //     result3[result3.length] = [i, rg_len3, rg_pos3, rg_per3, rg_pnt3];
            //     // console.log('ここだよ');
            // }
            // // console.log(result3);

            // if (!res4 || res4.length == 0) {
            //     // console.log('여기 걸리면 안되는데');
            //     continue;
            // } else if (res4 && res4.length <= 1) {
            //     rg_per4 = Math.round(rg_cnt4 / (d_length4) * 100000) / 1000;
            //     result4[result4.length] = [i, rg_len4, rg_pos4, rg_per4, rg_pnt4];
            //     // console.log('ここだよ');
            // }



            

            // // BMH 検索時
            // if (!res2 || res2.length == 0) continue;
            // rg_per2 = Math.round(rg_cnt2 / (d_length2) * 100000) / 1000;
            // result2[result2.length] = [i, rg_len2, rg_pos2, rg_per2, rg_pnt2];

            // // PBSCH 検索時
            // if (!res3 || res3.length == 0) continue;
            // rg_per3 = Math.round(rg_cnt3 / (d_length3) * 100000) / 1000;
            // result3[result3.length] = [i, rg_len3, rg_pos3, rg_per3, rg_pnt3];

        }

        // console.log(result3);



        // for ( var i = 0; i < result3.length; i++) {
        //     if (result3[i][3] < 100) {
        //         // console.log(result3[i]);
        //         delete result3[i]
        //     }
        // }
        // result3  = result3.filter(function(item) {
        //     return item !== null && item !== undefined && item !== '';
        // });


        // console.log(result3);




        // if (reg_s3.length <= 1) {
        //     // 확률이 100가 안되는 것들만 필터하기
        //     // 각각의 리스트에서 3번째 항목이 100이 안되면 삭제시켜서 리스트를 재 구성하게끔 되어있음.
        //     for ( var i = 0; i < result3.length; i++) {
        //         if (result3[i][3] < 100 ) {
        //             delete result3[i]
        //         }
        //     }
        //     result3  = result3.filter(function(item) {
        //         return item !== null && item !== undefined && item !== '';
        //     });
        // }
        // console.log(reg_s3.length);
        // for ( var i = 0; i < result3.length; i++) {
        //     console.log(result3[i]);
        // }


        
        



        






        // ------------------------------------------------------------------일단 비활성화----------------------------------------------------------------
        
        function listFilter (array1, array2) {
            var count = 0;
            var viewList = [];
            var notViewList = [];
            // console.log(array2);
            for ( var i = 0; i < array2.length; i++ ) {
                for (var k = 0;  k < array1.length; k++) {
                    // console.log(array1[k][0]);
                    // console.log(array2[i][0]);
                    
                    
                    if (array1[k][0] == array2[i][0]) {
                        // console.log('보여줘야 할 번호 ', count);
                        viewList.push(count);
                    } else if (array1[k][0] != array2[i][0]) {
                        notViewList.push(count);
                        if ( count != viewList ) {
                            // console.log('보여주면 안되는 번호 ', count);
                            notViewList.push(count);
                        }
                    }
                    count++;
                }
                count = 0;
            }
            // 보여주지 말아야 할 리스트에서 중복되는 항목 제거
            var notduply_viewlist = Array.from(new Set(notViewList));
            
            // duply_viewlist와 viewList를 ①중복되는 항목은 삭제하고 ②두개의 리스트를 합치기
            for (var ks = 0;  ks < notduply_viewlist.length; ks++) {
                if (viewList.includes(notduply_viewlist[ks])) {
                    delete notduply_viewlist[ks];
                }
            }
            // console.log('viewList :', viewList);
            // console.log('notduply_viewlist:', notduply_viewlist);
            
            if (notduply_viewlist.length != 0) {
                // 보여주지 말아야 할 리스트에 있는지 확인해서 result에서 삭제하기
                for (var k = 0;  k < array1.length; k++) {
                    for (var ls = 0; ls < notduply_viewlist.length; ls++) {
                        delete array1[notduply_viewlist[ls]];
                    }
                }
                
                // for (var k = 0;  k < array1.length; k++) {
                //     if (notduply_viewlist.includes(array1[k][0])) {
                //         delete array1[k];
                //     }
                // }
            } else if (notduply_viewlist.length == 0 && keyword != '' ) {
                array1 = array1;
            } else if (notduply_viewlist.length == 0) {
                for (var k = 0;  k < array1.length; k++) {
                    delete array1[k];
                } 
            }
            result  = result.filter(function(item) {
                return item !== null && item !== undefined && item !== '';
            });
            
        }

        
        // if (result.length == 1 ) {
        //     result = result;
        // } else {
        //     listFilter(result, result2);
        // }
   

        // // console.log(result_original);
        // // console.log(result);
        result  = result.filter(function(item) {
            return item !== null && item !== undefined && item !== '';
        });
        result_original  = result_original.filter(function(item) {
            return item !== null && item !== undefined && item !== '';
        });
        // console.log(result);

        

        // if ( result.length == 0 ) {
        //     listFilter(result_original, result3);

        // } else if (result.length == 1 && result3.length != 0) {
        //     // console.log('result : ', result);
        //     result = result;
        // } else if (result.length == 1 && result3.length == 0) {
        //     if (!keyword) {
        //         delete result[0];
        //     }
        // } else if (result.length > 1 && result3.length == 0) {
        //     if (!keyword) {
        //         for (var i = 0; i <= result.length; i++) {
        //             delete result[i];
        //         }
        //     } else if (keyword && !bmh && !pbsch && !cases) {
        //         result = result;
        //     }　else if (keyword && bmh && pbsch && cases) {
        //         for (var i = 0; i <= result.length; i++) {
        //             delete result[i];
        //         }
        //     }
        // } else {
        //     // console.log('result : ', result);
        //     listFilter(result, result3);
        // }



        // result  = result.filter(function(item) {
        //     return item !== null && item !== undefined && item !== '';
        // });

// ------------------------------------------------------------------여기까지----------------------------------------------------------------
        


        // result_original  = result_original.filter(function(item) {
        //     return item !== null && item !== undefined && item !== '';
        // });

        // console.log('result_original : ', result_original)
        // console.log('result : ', result)
        // console.log('採取方法 (type) result2 : ', result2)
        // // console.log('result2 : ', result2.length)
        // console.log('通知区分 (state) result3 : ', result3)
        // console.log('事例区分 (place)result4 : ', result4)


        // 採取方法 (type)만 선택한 경우
        if (result2.length >= 1 && result3.length <= 0 && result4.length <= 0) {
            result = result2;

        // 通知区分 (state)만 선택한 경우
        } else if (result2.length <= 0 && result3.length >= 1 && result4.length <= 0) {
            result = result3;

        // 事例区分 (place)만 선택한 경우
        } else if (result2.length <= 0 && result3.length <= 0 && result4.length >= 1) {
            result = result4;

        // ①採取方法 (type)과 ②通知区分 (state)만 선택한 경우
        } else if  (result2.length >= 1 && result3.length >= 1 && result4.length <= 0) {
            listFilter(result, result2);
            listFilter(result, result3);

        // ①採取方法 (type)과 ③事例区分 (place)만 선택한 경우
        } else if  (result2.length >= 1 && result3.length <= 0 && result4.length >= 1) {
            listFilter(result, result2);
            listFilter(result, result4);

        // ②通知区分 (state)과 ③事例区分 (place)만 선택한 경우
        } else if  (result2.length <= 0 && result3.length >= 1 && result4.length >= 1) {
            listFilter(result, result3);
            listFilter(result, result4);

        // ①採取方法 (type)과 ②通知区分 (state)과 ③事例区分 (place)를 모두 선택한 경우
        } else if  (result2.length >= 1 && result3.length >= 1 && result4.length >= 1) {
            listFilter(result, result2);
            listFilter(result, result3);
            listFilter(result, result4);

        // 
        }
        




        // console.log('2result : ', result)
        // console.log('2result2 : ', result2)
        // console.log('2result3 : ', result3)
        // console.log('2result4 : ', result4)
















            
        
        

        // データ番号の昇順（database.jsの昇順）に並べ替え
        for (var i = 0, result_length = result.length; i < result_length; i++) {
            for (var j = i + 1; j < result_length; j++) {
                if (result[i][0] < result[j][0]) {
                    var temp   = result[j];
                    result[j] = result[i];
                    result[i] = temp;
                }
            }
        }
        

        return result;










        

    }
    ,
    judge_target : function (
        i,
        query_refine1,
        query_refine2,
        query_yearfrom,
        query_yearto,
        query_hasimage,
        query_class1,
        query_class2,
        query_class3
    ) {

        var s, s2, s3, s4, c1, c2, c3;

        //形態で絞り込み
        if(query_refine1 == 'null'){
            s=[]
        }else{
            s = this.dataset[i]['type'].match(query_refine1)
            // console.log(s);
        };

        // // //作成年代で絞り込み
        // if(query_refine2 == 'null'){
        //     s2=[]
        // } else if(this.dataset[i]['create_date'].indexOf(query_refine2)==0) {
        //     s2 = true;
        // }else{
        //     s2 = null;
        // };
        // //作成年の範囲で絞り込み
        // if(query_yearfrom == 'null' && query_yearto == 'null'){
        //     s4=[]
        // } else if (query_yearfrom <= this.dataset[i]['create_date'] && this.dataset[i]['create_date'] <= query_yearto){
        //     s4 = true;
        // } else {
        //     s4 = null;
        // }



        //　-------------　PBSCH を絞り込み（修正バージョン）　-------------
        // //作成年代で絞り込み
        if(query_refine2 == 'null'){
            s2=[]
        } else if(this.dataset[i]['state'].indexOf(query_refine2)==0) {
            s2 = true;
        }else{
            s2 = null;
        };
        //作成年の範囲で絞り込み
        if(query_yearfrom == 'null' && query_yearto == 'null'){
            s4=[]
        } else if (query_yearfrom <= this.dataset[i]['state'] && this.dataset[i]['create_date'] <= query_yearto){
            s4 = true;
        } else {
            s4 = null;
        }

        //画像有無で絞り込み
        if(query_hasimage == 'null'){
            s3=[]
        }else if(query_hasimage == 1){
            // 画像あり
            if(this.dataset[i]['image'] != ''  && this.dataset[i]['image'] !='noimage'){
                s3=[1]
            }else{
                s3=false
            }
        }else if(query_hasimage == 2){
            // 画像なし
            if(this.dataset[i]['image'] == '' || this.dataset[i]['image'] =='noimage'){
                s3=[2]
            }else{
                s3=false
            }
        }else{
            s3=false
        };

        //大分類で絞り込み
        if(query_class1 == 'null'){
            c1=[]
        }else{
            c1 = this.dataset[i]['class1'].match(query_class1)
        };
        //中分類で絞り込み
        if(query_class2 == 'null'){
            c2=[]
        }else{
            c2 = this.dataset[i]['class2'].match(query_class2)
        };
        //小分類で絞り込み
        if(query_class3 == 'null'){
            c3=[]
        }else{
            c3 = this.dataset[i]['class3'].match(query_class3)
        };

        if (s && s2 && s3 && s4 && c1 && c2 && c3) {
            return true;
        }
        return false;
    }
    ,
    set_st : function (result)
    {
        var str = this.caption.stat;

        if( result.length > 0){
            var str = this.caption.stat;
            str = str.replace('{%TOTAL%}' , this.dataset.length);
            str = str.replace('{%RESULT%}', result.length);

        } else{
            var str = this.caption.stat_not;
            str = str.replace('{%TOTAL%}' , this.dataset.length);
        }

        this.st.innerHTML = str;
    }
    ,
    view : function (result, offset)
    {
        
        var pageNumInput = document.getElementById('pageNum');
        var pageNum = document.getElementById('pageNum');
        // console.log('page_num : ', page_num);
        if (!offset) offset = 1;
        if (!result) {
            // console.log('test!!!!!!!!!!');
            result = this.last.reverse();
        } else {
            
            this.last = result;
        }
        // console.log(this.last);

        if (result.length == 0) {
            if (this.lastquery != '') {
                var buf = '<p class="result-message">';
                buf += this.caption.notfound;
                buf += '</p>';
                this.re.innerHTML = buf;
            } else {
                var buf = '<p class="result-message">';
                buf += this.caption.error;
                buf += '</p>';
                this.re.innerHTML = buf;
            }
            return;
        }


   
        // console.log(result);
        var r     = result.reverse()
        var count = 0;

        this.re.innerHTML = "";

        table_header = "";

        this.re.innerHTML += table_header;

        for (var i = (offset - 1) * this.max, r_len = r.length; i < r_len; i++) {

            count++;
            if (count > this.max) break;

            var buf           ="";
            var num           = r[i][0];
            var idx_len_title = r[i][1];
            var idx_len_body  = r[i][2];
            var idx_len_age   = r[i][3];
            var rg_length     = r[i][4];
            var rg_pos        = r[i][5];
            var rg_per        = r[i][6];
            var rg_pnt        = r[i][7];
            var d             = this.dataset[num];


            buf   += "<div class='row'>";

            // buf   += "<div class='two columns thumbnail-block'>";

            // if (d.image =="" || d.image =="noimage") {
            //     buf   += "<img class='thumbnail-img' src='images/common/noimage.gif' alt='画像はありません'>";
            // } else {
            //     buf   += "<img class='thumbnail-img' src='images/" + d.image + "' alt=''>";
            // }

            // buf   += "</div>";

            buf   += "<div class='twelve columns text-block'>";

            buf   += "<dl>";

            // buf += (d.type == 'pdf') ? '<dt class="pdf">' : '<dt>';
            var href = 'result.html?itemkey=' + d.itemkey;    //itemkeyに直した
            buf += '<a ';
            buf += ''
            buf += "style='font-size:18px; font-weight:bold; padding:20px;' "
            if (pageNumInput.value > 0) {
                // buf += 'href="javascript:void(0);" onclick="location.href=\'' + href + '&pageNum=' + pageNumInput.value +'\'; page_add(); return false;">';
                buf += 'href="' + href + '" target="_blank";>'; // 새탭으로 열기
            } else {
                // buf += 'href="javascript:void(0);" onclick="location.href=\'' + href + '&pageNum=1' +'\'; page_add(); return false;">';
                buf += 'href="' + href + '" target="_blank";>'; // 새탭으로 열기
            }
            
            // buf += '<a href="javascript:void(0);" onclick="location.href=\'' + href + '\';return false;">';

            if (idx_len_title.length > 0) {

                buf += this.snippet(d.title, idx_len_title);

            } else {
                buf += (d.title || "無題");
            }
            buf += "</a>";
            
            if (d.type == 'pdf') {
                buf += this.caption.result_pdf;
            }

            buf += "</dt>";
            buf += "<dd>";

            // if (idx_len_age.length > 0) {
            //     buf += "<p class=" + '"age"'+">" + this.snippet(d.age, idx_len_age) + "</p>";
            // } else if(!d.age) {
            //     buf += "<p class=" + '"age"'+ ">―</p>";
            // } else {
            //     buf += "<p class=" + '"age"'+ ">"+ d.age +"</p>";
            // }

            buf += "<p class='itemkey' style=' margin-top:10px;'>";
            buf += "<span class='itemkey-head'>発出日</span>";
            if (d.itemkey) {
                buf += "<span class='itemkey-data'>" + d.create_date + "</span>";
            } else {
                buf += "<span class='itemkey-data'> ― </span>";
            }

            
            buf += "<span class='info-head'>採取方法</span>";
            if (d.type) {
                buf += "<span class='info-data'>" + d.type + "</span>";
            } else {
                buf += "<span class='info-data'> ― </span>";
            }


            buf += "<span class='info-head'>通知区分</span>";
            if (d.state) {
                buf += "<span class='info-data'>" + d.state + "</span>";
            } else {
                buf += "<span class='info-data'> ― </span>";
            }




            buf += "<span class='info-head'>事例分類</span>";
            if (d.place) {
                buf += "<span class='info-data'>" + d.place + "</span>";
            } else {
                buf += "<span class='info-data'> ― </span>";
            }




            buf += "</p>";

            buf += "<p class='info'>";
            // buf += "<span class='info-head'>[作成日]</span>";

            // if (d.year) {
            //     buf += "<span class='info-data'>" + d.year + "</span>";
            // } else {
            //     buf += "<span class='info-data'> ― </span>";
            // }

            // buf += "<span class='info-head'>[採取方法]</span>";
            // if (d.type) {
            //     buf += "<span class='info-data'>" + d.itemkey + "</span>";
            // } else {
            //     buf += "<span class='info-data'> ― </span>";
            // }

            // buf += "<span class='info-head'>[大分類]</span>";
            // if (d.class1) {
            //     buf += "<span class='info-data'>" + d.class1 + "</span>";
            // } else {
            //     buf += "<span class='info-data'> ― </span>";
            // }
            // buf += "<span class='info-head'>[中分類]</span>";
            // if (d.class2) {
            //     buf += "<span class='info-data'>" + d.class2 + "</span>";
            // } else {
            //     buf += "<span class='info-data'> ― </span>";
            // }
            // buf += "<span class='info-head'>[小分類]</span>";
            // if (d.class3) {
            //     buf += "<span class='info-data'>" + d.class3 + "</span>";
            // } else {
            //     buf += "<span class='info-data'> ― </span>";
            // }
            // buf += "<span class='info-head'>[通知区分]</span>";
            // if (d.state) {
            //     buf += "<span class='info-data'>" + d.state + "</span>";
            // } else {
            //     buf += "<span class='info-data'> ― </span>";
            // }

            
            // if (d.place) {
            //     buf += "<span class='info-head'>[事例分類]</span>";
            //     buf += "<span class='info-data'>" + d.place + "</span>";
            // } else {
            //     buf += "<span class='info-head'>[事例分類]</span>";
            //     buf += "<span class='info-data'> ― </span>";
            // }

            buf += "</p>";


            // console.log(d.body.length);
            if (idx_len_body.length > 0) {
                // buf += this.snippet(d.body, idx_len_body);
                buf += d.body.substr(0, this.result_prefix + this.result_suffix); // <-- 위의 코드를 넣는 대신 이 코드를 넣으면 검색결과화면에서 본문의 프레뷰를 2줄로 줄여서 보여줄수 있음. 클라이언트의 요청으로 해당코드로 변경 (2021/3/19)
            } else {
                buf += d.body.substr(0, this.result_prefix + this.result_suffix);
            }
            buf += "...</dd>";

            buf += "</dl>";
            buf += "</div>";
            buf += "</div>";
            buf += "<hr style='margin-top:10px; margin-bottom:10px;'>";

            this.re.innerHTML += buf;
        }
    }
    ,
    snippet : function (body, idx_len)
    {
        if (idx_len[0][0] == null) {
        //キーワード（強調する文字）の出現位置が無い場合（キーワード未入力の場合）
            return body;
        }

        for (var i = 0, idx_length = idx_len.length; i < idx_length; i++) {
            for (var j = i + 1; j < idx_length; j++) {
                if (idx_len[i][0] > idx_len[j][0]) {
                    var temp   = idx_len[j];
                    idx_len[j] = idx_len[i];
                    idx_len[i] = temp;
                }
            }
        }

        if (idx_len.length == 1) {
            var idx   = idx_len[0][0];
            var len   = idx_len[0][1];
            var start = idx_len[0][0] - this.result_prefix;
            return [
                body.substring(start, idx),
                "<strong style='background: linear-gradient(to top, yellow 50%, transparent 50%);'>",
                body.substr(idx, len),
                "</strong>",
                body.substr(idx + len, this.result_suffix)
            ].join("");
        } else {
            var start  = idx_len[0][0] - this.result_prefix;
            var result = [body.substring(start, idx_len[0][0])];
            var skip   = false;
            for (var i = 0, idx_length = idx_len.length; i < idx_length; i++) {
                var idx = idx_len[i][0];
                var len = idx_len[i][1];

                if (!skip) {
                    result.push("<strong>");
                    result.push(body.substr(idx, len))
                    result.push("</strong>");
                } else {
                    skip = false;
                }
                if (idx_len[i + 1]) {
                    var idx_next = idx_len[i + 1][0];
                    var len_next = idx_len[i + 1][1];
                    if (idx_next - (idx + len) >= this.result_prefix) {
                        result.push(body.substr(idx + len, this.result_suffix_glue));
                        result.push('.....');
                        start = idx_next - this.result_prefix_glue;
                        result.push(body.substring(start, idx_next));
                    } else if(idx + len >= idx_next + len_next) {
                        skip = true;
                        if (!idx_len[i + 1]) {
                            result.push(body.substr(idx + len, this.result_suffix));
                        } else {
                            idx_len[i + 1][0] = idx_len[i][0];
                            idx_len[i + 1][1] = idx_len[i][1];
                        }
                    } else if((idx + len) > idx_next) {
                        result.pop();
                        start = idx + len;
                        result.push(body.substring(start, idx_next + len_next));
                        result.push("</strong>");
                        skip = true;
                        if (!idx_len[i + 1]) result.push(body.substr(idx_next + len_next, this.result_suffix));
                    } else {
                        start = idx + len;
                        result.push(body.substring(start, idx_next));
                    }
                } else {
                    result.push(body.substr(idx + len, this.result_suffix));
                }
            }
            return result.join("");
        }
    }
    ,
    pagenavi : function (result, nv)
    {
        // console.log('nv : ', nv);
        var len = result.length;
        var ct  = Math.ceil(len / this.max); // 표시 해야 할 페이지 수
        var buf = [];
        var max_index = 10;        //上部のページ切り替え部分の数、表示件数でないので注意。 한번에 표시할 페이지 번호 갯수
        var obj = this;
        var pageNumInput = document.getElementById('pageNum');
        
        

        nv.innerHTML = '';
        // ------------------ 딱히 중요하지 않은 부분 ---------------------
        if (ct > max_index) {
            var span = document.createElement('span');
            var text = document.createTextNode(this.caption.navi_first);
            span.setAttribute('index', 1);
            span.onclick = function ()
            {
                var index = Number(this.getAttribute('index'));
                obj.view(null, index);
                obj.sw(index);
                obj.change_group(1);
            };
            span.appendChild(text);
            nv.appendChild(span);
        }
        // ------------------ 딱히 중요하지 않은 부분 끝---------------------

        // console.log(pageNumInput.value);
        // if (pageNumInput) {
        //     console.log(pageNumInput);
        // }
        for (var i = 1, group = 1; i <= ct; i++) {
            var span = document.createElement('span');
            var text = document.createTextNode(i);
            
            span.setAttribute('index', i);
            span.setAttribute('group', group);
            span.onclick = function ()
            {
                var index = Number(this.getAttribute('index'));
                console.log(index);
                pageNumInput.value = index;
                obj.view(null, index);
                obj.sw(index);
            };
            if (group > 1) span.style.display = 'none';
            span.appendChild(text);
            nv.appendChild(span);

            if (i < ct && i % max_index == 0) {
                var span = document.createElement('span');
                var text = document.createTextNode(this.caption.navi_next);
                span.setAttribute('index', i + 1);
                span.setAttribute('group', group);
                span.onclick = function ()
                {
                    var index = Number(this.getAttribute('index'));
                    var g     = Number(this.getAttribute('group'));
                    obj.view(null, index);
                    obj.sw(index);
                    obj.change_group(g + 1);
                };
                if (group > 1) span.style.display = 'none';
                span.appendChild(text);
                nv.appendChild(span);

                group++;
                var span = document.createElement('span');
                var text = document.createTextNode(this.caption.navi_prev);
                span.setAttribute('index', i);
                span.setAttribute('group', group);
                span.onclick = function ()
                {
                    var index = Number(this.getAttribute('index'));
                    var g     = Number(this.getAttribute('group'));
                    obj.view(null, index);
                    obj.sw(index);
                    obj.change_group(g - 1);
                };
                span.style.display = 'none';
                span.appendChild(text);
                nv.appendChild(span);
            }

        }
        if (ct > max_index) {
            var span = document.createElement('span');
            var text = document.createTextNode(this.caption.navi_last);
            span.setAttribute('index', ct);
            span.onclick = function ()
            {
                var index = Number(this.getAttribute('index'));
                obj.view(null, index);
                obj.sw(index);
                obj.change_group(group);
            };
            span.appendChild(text);
            nv.appendChild(span);
        }

        this.sw(1);
    }
    ,
    change_group : function (g)
    {
        this.change_group_exe(g, this.nv1);
        this.change_group_exe(g, this.nv2);
    }
    ,
    change_group_exe : function (g, nv)    // ページナビの表示部分を移動する。
    {
        var span = nv.getElementsByTagName("span");
        for (var i = 0; i < span.length; i++) {
            if (!span[i].getAttribute('group') || span[i].getAttribute('group') == '') continue;
            if (String(span[i].getAttribute('group')) == String(g)) {
                span[i].style.display = 'inline';
            } else {
                span[i].style.display = 'none';
            }
        }
    }
    ,
    sw : function (t)
    {
        this.sw_exe(t, this.nv1);
        this.sw_exe(t, this.nv2);
    }
    ,
    sw_exe : function (t, nv)    // ページナビの指定のページボタンを選択状態にする。
    {
        var span = nv.getElementsByTagName("span");
        for (var i = 0; i < span.length; i++) {
            span[i].className = ( String(span[i].getAttribute('index')) == String(t) ? "selected" : "");
        }
    }
    ,
    rollback : function(e) {
        alert(e);
    }
};


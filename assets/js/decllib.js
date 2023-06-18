var case_abbr = ["nom", "acc", "ins", "dat", "abl", "gen", "loc", "voc"];
var gender_abbr = ["sg", "pl"];
var paradn_generic = {};
var paradn_pron = {};
var paradn_irrn = {};
paradn_generic["a,m"] = ["o;ā", "aṃ;e", "ena;ehi,ebhi", "assa,āya,atthaṃ;ānaṃ", "asmā,amhā,ā;ehi,ebhi", "assa;ānaṃ", "asmiṃ,amhi,e;esu", "a,ā;ā"];
paradn_generic["ā,f"] = ["ā;ā,āyo", "aṃ;ā,āyo", "āya;āhi,ābhi", "āya;ānaṃ", "āya;āhi,ābhi", "āya;ānaṃ", "āya,āyaṃ;āsu", "e;ā,āyo"];
paradn_generic["a,n"] = ["aṃ;āni,ā", "aṃ;āni,e", "ena;ehi,ebhi", "assa;ānaṃ", "asmā,amhā,ā;ehi,ebhi", "assa;ānaṃ", "asmiṃ,amhi,e;esu", "a;ā,āni"];
paradn_generic["i,m"] = ["i;ī,ayo", "iṃ;ī,ayo", "inā;īhi,ībhi,ihi,ibhi", "issa,ino;īnaṃ,inaṃ", "ismā,imhā,inā;īhi,ībhi,ihi,ibhi", "issa,ino;īnaṃ,inaṃ", "ismiṃ,imhi;īsu,isu", "i;ī,ayo"];
paradn_generic["i,f"] = ["i;ī,iyo", "iṃ;ī,iyo", "iyā;īhi,ībhi,ihi,ibhi", "iyā;īnaṃ,inaṃ", "iyā;īhi,ībhi,ihi,ibhi", "iyā;īnaṃ,inaṃ", "iyā,iyaṃ;īsu,isu", "i;ī,iyo"];
paradn_generic["i,n"] = ["i;īni,ī", "iṃ;īni,ī", "inā;īhi,ībhi,ihi,ibhi", "issa,ino;īnaṃ,inaṃ", "ismā,imhā,inā;īhi,ībhi,ihi,ibhi", "issa,ino;īnaṃ,inaṃ", "ismiṃ,imhi;īsu,isu", "i;ī,īni"];
paradn_generic["ī,m"] = ["ī;ī,ino", "inaṃ,iṃ;ī,ino", "inā;īhi,ībhi", "issa,ino;īnaṃ", "ismā,imhā,inā;īhi,ībhi", "issa,ino;īnaṃ", "ismiṃ,imhi,ini;īsu", "i;ī,ino"];
paradn_generic["ī,f"] = ["ī;ī,iyo", "iyaṃ,iṃ;ī,iyo", "iyā;īhi,ībhi", "iyā;īnaṃ", "iyā;īhi,ībhi", "iyā;īnaṃ", "iyā,iyaṃ;īsu", "i;ī,iyo"];
paradn_generic["u,m"] = ["u;ū,avo", "uṃ;ū,avo", "unā;ūhi,ūbhi,uhi,ubhi", "ussa,uno;ūnaṃ,unaṃ", "usmā,umhā,unā;ūhi,ūbhi,uhi,ubhi", "ussa,uno;ūnaṃ,unaṃ", "usmiṃ,umhi;ūsu,usu", "u;ū,avo,ave"];
paradn_generic["u,f"] = ["u;ū,uyo", "uṃ;ū,uyo", "uyā;ūhi,ūbhi,uhi,ubhi", "uyā;ūnaṃ,unaṃ", "uyā;ūhi,ūbhi,uhi,ubhi", "uyā;ūnaṃ,inaṃ", "uyā,uyaṃ;ūsu", "u;ū,uyo"];
paradn_generic["u,n"] = ["u;ūni,ū", "uṃ;ūni,ū", "usā,unā;ūhi,ūbhi,uhi,ubhi", "ussa,uno;ūnaṃ,unaṃ", "usmā,umhā,unā;ūhi,ūbhi,uhi,ubhi", "ussa,uno;ūnaṃ,unaṃ", "usmiṃ,umhi;ūsu,usu", "u;ūni,ū"];
paradn_generic["ū,m"] = ["ū;ū,uno", "uṃ;ū,uno", "unā;ūhi,ūbhi", "ussa,uno;ūnaṃ", "usmā,umhā,unā;ūhi,ūbhi", "ussa,uno;ūnaṃ", "usmiṃ,umhi;ūsu", "u;ū,uno"];
paradn_generic["ū,f"] = ["ū;ū,uyo", "uṃ;ū,uyo", "uyā;ūhi,ūbhi", "uyā;ūnaṃ", "uyā;ūhi,ūbhi", "uyā;ūnaṃ", "uyā,uyaṃ;ūsu", "u;ū,uyo"];
paradn_pron["tumha;a,m"] = ["-3vaṃ,-3uvaṃ;e,-4vo", "-3vaṃ,-3uvaṃ,-3avaṃ,-3aṃ;ākaṃ,e,-4vo", "-3ayā,-3vayā,-3e;ehi,ebhi,-4vo", "-2yhaṃ,aṃ,-3ava,-3e;aṃ,ākaṃ,-4vo", "-3ayā;ehi,ebhi", "-2yhaṃ,aṃ,-3ava,-3e;aṃ,ākaṃ,-4vo", "-3ayi,-3vayi;esu", ";"];
paradn_pron["tumha;ā,f"] = ["-3vaṃ,-3uvaṃ;e,-4vo", "-3vaṃ,-3uvaṃ,-3avaṃ,-3aṃ;ākaṃ,e,-4vo", "-3ayā,-3vayā,-3e;ehi,ebhi,-4vo", "-2yhaṃ,aṃ,-3ava,-3e;aṃ,ākaṃ,-4vo", "-3ayā;ehi,ebhi", "-2yhaṃ,aṃ,-3ava,-3e;aṃ,ākaṃ,-4vo", "-3ayi,-3vayi;esu", ";"];
paradn_pron["tumha;a,n"] = ["-3vaṃ,-3uvaṃ;e,-4vo", "-3vaṃ,-3uvaṃ,-3avaṃ,-3aṃ;ākaṃ,e,-4vo", "-3ayā,-3vayā,-3e;ehi,ebhi,-4vo", "-2yhaṃ,aṃ,-3ava,-3e;aṃ,ākaṃ,-4vo", "-3ayā;ehi,ebhi", "-2yhaṃ,aṃ,-3ava,-3e;aṃ,ākaṃ,-4vo", "-3ayi,-3vayi;esu", ";"];
paradn_pron["amha;a,m"] = ["-2haṃ;-3mayaṃ,e,-3no", "-3maṃ,-3mamaṃ;ākaṃ,e,-3no", "-3mayā,-3me;ehi,ebhi,-3no", "-3mayhaṃ,aṃ,-3mama,-3mamaṃ,-3me;aṃ,ākaṃ,-2smākaṃ,-3no", "-3mayā;ehi,ebhi", "-3mayhaṃ,aṃ,-3mama,-3mamaṃ,-3me;aṃ,ākaṃ,-2smākaṃ,-3no", "-3mayi;esu", ";"];
paradn_pron["amha;ā,f"] = ["-2haṃ;-3mayaṃ,e,-3no", "-3maṃ,-3mamaṃ;ākaṃ,e,-3no", "-3mayā,-3me;ehi,ebhi,-3no", "-3mayhaṃ,aṃ,-3mama,-3mamaṃ,-3me;aṃ,ākaṃ,-2smākaṃ,-3no", "-3mayā;ehi,ebhi", "-3mayhaṃ,aṃ,-3mama,-3mamaṃ,-3me;aṃ,ākaṃ,-2smākaṃ,-3no", "-3mayi;esu", ";"];
paradn_pron["amha;a,n"] = ["-2haṃ;-3mayaṃ,e,-3no", "-3maṃ,-3mamaṃ;ākaṃ,e,-3no", "-3mayā,-3me;ehi,ebhi,-3no", "-3mayhaṃ,aṃ,-3mama,-3mamaṃ,-3me;aṃ,ākaṃ,-2smākaṃ,-3no", "-3mayā;ehi,ebhi", "-3mayhaṃ,aṃ,-3mama,-3mamaṃ,-3me;aṃ,ākaṃ,-2smākaṃ,-3no", "-3mayi;esu", ";"];
paradn_pron["ta;a,m"] = ["-1so;e,-1ne", "aṃ,-1naṃ;e,-1ne", "ena,-1nena;ehi,ebhi,-1nehi,-1nebhi", "assa,-1assa,-1nassa;esaṃ,esānaṃ,-1nesaṃ,-1nesānaṃ", "asmā,amhā,-1asmā,-1nasmā,-1namhā;ehi,ebhi,-1nehi,-1nebhi", "assa,-1assa,-1nassa;esaṃ,esānaṃ,-1nesaṃ,-1nesānaṃ", "asmiṃ,amhi,-1asmiṃ,-1nasmiṃ,-1namhi;esu,-1nesu", ";"];
paradn_pron["ta;ā,f"] = ["-1sā;ā,āyo,-1nā,-1nāyo", "aṃ,-1naṃ;ā,āyo,-1nā,-1nāyo", "āya,-1nāya;āhi,ābhi,-1nāhi,-1nābhi", "assā,issā,assāya,issāya,-1assā,-1nassā,-1assāya,-1nassāya,āya,-1nāya;āsaṃ,āsānaṃ,-1nāsaṃ,-1nāsānaṃ", "āya,-1nāya;āhi,ābhi,-1nāhi,-1nābhi", "assā,issā,assāya,issāya,-1assā,-1nassā,-1assāya,-1nassāya,āya,-1nāya;āsaṃ,āsānaṃ,-1nāsaṃ,-1nāsānaṃ", "assaṃ,issaṃ,-1assaṃ,-1nassaṃ,āya,-1nāya;āsu,-1nāsu", ";"];
paradn_pron["ta;a,n"] = ["aṃ,-1naṃ;āni,-1nāni", "aṃ,-1naṃ;āni,-1nāni", "ena,-1nena;ehi,ebhi,-1nehi,-1nebhi", "assa,-1assa,-1nassa;esaṃ,esānaṃ,-1nesaṃ,-1nesānaṃ", "asmā,amhā,-1asmā,-1nasmā,-1namhā;ehi,ebhi,-1nehi,-1nebhi,", "assa,-1assa,-1nassa;esaṃ,esānaṃ,-1nesaṃ,-1nesānaṃ", "asmiṃ,amhi,-1asmiṃ,-1nasmiṃ,-1namhi;esu,-1nesu", ";"];
paradn_pron["eta;a,m"] = ["-1so;e", "aṃ;e", "ena;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmā,amhā;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmiṃ,amhi;esu", ";"];
paradn_pron["eta;ā,f"] = ["-1sā;ā,āyo", "aṃ;ā,āyo", "āya;āhi,ābhi", "āya,issā,issāya;āsaṃ,āsānaṃ", "āya;āhi,ābhi", "āya,issā,issāya;āsaṃ,āsānaṃ", "āyaṃ,issaṃ;āsu", ";"];
paradn_pron["eta;a,n"] = ["aṃ;āni", "aṃ;āni", "ena;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmā,amhā;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmiṃ,amhi;esu", ";"];
paradn_pron["ima;a,m"] = ["-2ayaṃ;e", "aṃ;e", "inā,-2anena;ehi,ebhi,-2ehi,-2ebhi", "assa,-2assa;esaṃ,esānaṃ,-2esaṃ,-2esānaṃ", "asmā,amhā,-2asmā;ehi,ebhi,-2ehi,-2ebhi", "assa,-2assa;esaṃ,esānaṃ,-2esaṃ,-2esānaṃ", "asmiṃ,amhi,-2asmiṃ;esu,-2esu", ";"];
paradn_pron["ima;ā,f"] = ["-2ayaṃ;ā,āyo", "aṃ;ā,āyo", "āya;āhi,ābhi", "āya,issā,issāya,-2assā,-2assāya;āsaṃ,āsānaṃ", "āya;āhi,ābhi", "āya,issā,issāya,-2assā,-2assāya;āsaṃ,āsānaṃ", "āyaṃ,issā,issaṃ,-2assaṃ;āsu", ";"];
paradn_pron["ima;a,n"] = ["-1daṃ,aṃ;āni", "-1daṃ,aṃ;āni", "inā,-2anena;ehi,ebhi,-2ehi,-2ebhi", "assa,-2assa;esaṃ,esānaṃ,-2esaṃ,-2esānaṃ", "asmā,amhā,-2asmā;ehi,ebhi,-2ehi,-2ebhi", "assa,-2assa;esaṃ,esānaṃ,-2esaṃ,-2esānaṃ", "asmiṃ,amhi,-2asmiṃ;esu,-2esu", ";"];
paradn_pron["amu;u,m"] = ["-1su;ū", "uṃ;ū", "unā;ūhi,ūbhi,uhi,ubhi", "ussa,-1dussa;ūsaṃ,ūsānaṃ,usaṃ,usānaṃ", "usmā,umhā;ūhi,ūbhi,uhi,ubhi", "ussa,-1dussa;ūsaṃ,ūsānaṃ,usaṃ,usānaṃ", "usmiṃ,umhi;ūsu,usu", ";"];
paradn_pron["amu;u,f"] = ["-1su;ū,uyo", "uṃ;ū,uyo", "uyā;ūhi,ūbhi", "ussā,uyā;ūsaṃ,ūsānaṃ", "uyā;ūhi,ūbhi", "ussā,uyā;ūsaṃ,ūsānaṃ", "ussaṃ,uyaṃ,uyā;ūsu", ";"];
paradn_pron["amu;u,n"] = ["-1duṃ;ū,ūni", "-1duṃ;ū,ūni", "unā;ūhi,ūbhi,uhi,ubhi", "ussa,-1dussa;ūsaṃ,ūsānaṃ,usaṃ,usānaṃ", "usmā,umhā;ūhi,ūbhi,uhi,ubhi", "ussa,-1dussa;ūsaṃ,ūsānaṃ,usaṃ,usānaṃ", "usmiṃ,umhi;ūsu,usu", ";"];
paradn_pron["kiṃ;a,m"] = ["o;e", "aṃ;e", "ena;ehi,ebhi", "assa,issa;esaṃ,esānaṃ", "asmā,amhā;ehi,ebhi", "assa,issa;esaṃ,esānaṃ", "asmiṃ,amhi,ismiṃ,imhi;esu", ";"];
paradn_pron["kiṃ;ā,f"] = ["ā;ā,āyo", "aṃ;ā,āyo", "āya;āhi,ābhi", "assā,āya;āsaṃ,āsānaṃ", "āya;āhi,ābhi", "assā,āya;āsaṃ,āsānaṃ", "assaṃ,āyaṃ;āsu", ";"];
paradn_pron["kiṃ;a,n"] = ["iṃ;āni", "iṃ;āni", "ena;ehi,ebhi", "assa,issa;esaṃ,esānaṃ", "asmā,amhā;ehi,ebhi", "assa,issa;esaṃ,esānaṃ", "asmiṃ,amhi,ismiṃ,imhi;esu", ";"];
paradn_pron["kiṃci;i,m"] = ["-3oci;-3eci", "-3añci;-3eci", "-3enaci;-3ehici", "-3assaci;-3esañci", "-3asmāci;-3ehici", "-3assaci;-3esañci", "-3asmiñci,-3ismiñci;-3esuci", ";"];
paradn_pron["kiṃci;i,f"] = ["-3āci;-3āci", "-3añci;-3āci", "-3āyaci;-3āhici", "-3āyaci,-2assāci;-3āsañci", "-3āyaci;-3āhici", "-3āyaci,-2assāci;-3āsañci", "-3āyaci;-3āsuci", ";"];
paradn_pron["kiṃci;i,n"] = ["-3iñci;-3ānici", "-3iñci;-3ānici", "-3enaci;-3ehici", "-3assaci;-3esañci", "-3asmāci;-3ehici", "-3assaci;-3esañci", "-3asmiñci,-3ismiñci;-3esuci", ";"];
paradn_pron["sabba;a,m"] = ["o;e", "aṃ;e", "ena;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmā,amhā;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmiṃ,amhi;esu", "a,ā;e"];
paradn_pron["sabba;ā,f"] = ["ā;ā,āyo", "aṃ;ā,āyo", "āya;āhi,ābhi", "assā,āya;āsaṃ,āsānaṃ", "āya;āhi,ābhi", "assā,āya;āsaṃ,āsānaṃ", "assaṃ,āyaṃ;āsu", "e;ā,āyo"];
paradn_pron["sabba;a,n"] = ["aṃ;āni", "aṃ;āni", "ena;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmā,amhā;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmiṃ,amhi;esu", "a;āni"];
paradn_pron["pubba;a,m"] = ["o;e,ā", "aṃ;e", "ena;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmā,amhā,ā;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmiṃ,amhi,e;esu", "a;e,ā"];
paradn_pron["pubba;ā,f"] = ["ā;ā,āyo", "aṃ;ā,āyo", "āya;āhi,ābhi", "assā,āya;āsaṃ,āsānaṃ", "āya;āhi,ābhi", "assā,āya;āsaṃ,āsānaṃ", "assaṃ,āyaṃ;āsu", "e;ā,āyo"];
paradn_pron["pubba;a,n"] = ["aṃ;āni", "aṃ;āni", "ena;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmā,amhā,ā;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmiṃ,amhi,e;esu", "a;āni"];
paradn_pron["ya;a,m"] = ["o;e", "aṃ;e", "ena;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmā,amhā;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmiṃ,amhi;esu", ";"];
paradn_pron["ya;ā,f"] = ["ā;ā,āyo", "aṃ;ā,āyo", "āya;āhi,ābhi", "assā,āya;āsaṃ,āsānaṃ", "āya;āhi,ābhi", "assā,āya;āsaṃ,āsānaṃ", "assaṃ,āyaṃ;āsu", ";"];
paradn_pron["ya;a,n"] = ["aṃ;āni", "aṃ;āni", "ena;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmā,amhā;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmiṃ,amhi;esu", ";"];
paradn_pron["eka;a,m"] = ["o;,", "aṃ;,", "ena;,", "assa;,", "asmā,amhā;,", "assa;,", "asmiṃ,amhi;,", ";"];
paradn_pron["eka;ā,f"] = ["ā;,", "aṃ;,", "āya;,", "issā,āya;,", "āya;,", "issā,āya;,", "issaṃ,āyaṃ;,", ";"];
paradn_pron["eka;a,n"] = ["aṃ;,", "aṃ;,", "ena;,", "assa;,", "asmā,amhā;,", "assa;,", "asmiṃ,amhi;,", ";"];
paradn_pron["ubho;a,m"] = [",;o,e", ",;o,e", ",;ohi,obhi,ehi,ebhi", ",;innaṃ", ",;ohi,obhi,ehi,ebhi", ",;innaṃ", ",;osu,esu", ";"];
paradn_pron["ubho;ā,f"] = [",;o,e", ",;o,e", ",;ohi,obhi,ehi,ebhi", ",;innaṃ", ",;ohi,obhi,ehi,ebhi", ",;innaṃ", ",;osu,esu", ";"];
paradn_pron["ubho;a,n"] = [",;o,e", ",;o,e", ",;ohi,obhi,ehi,ebhi", ",;innaṃ", ",;ohi,obhi,ehi,ebhi", ",;innaṃ", ",;osu,esu", ";"];
paradn_pron["dvi;i,m"] = [",;e,-1uve", ",;e,-1uve", ",;īhi,ībhi", ",;innaṃ,-1uvinnaṃ", ",;īhi,ībhi", ",;innaṃ,-1uvinnaṃ", ",;īsu", ";"];
paradn_pron["dvi;i,f"] = [",;e,-1uve", ",;e,-1uve", ",;īhi,ībhi", ",;innaṃ,-1uvinnaṃ", ",;īhi,ībhi", ",;innaṃ,-1uvinnaṃ", ",;īsu", ";"];
paradn_pron["dvi;i,n"] = [",;e,-1uve", ",;e,-1uve", ",;īhi,ībhi", ",;innaṃ,-1uvinnaṃ", ",;īhi,ībhi", ",;innaṃ,-1uvinnaṃ", ",;īsu", ";"];
paradn_pron["ti;i,m"] = [",;ayo", ",;ayo", ",;īhi,ībhi", ",;iṇṇaṃ,iṇṇanaṃ", ",;īhi,ībhi", ",;iṇṇaṃ,iṇṇanaṃ", ",;īsu", ";"];
paradn_pron["ti;i,f"] = [",;isso", ",;isso", ",;īhi,ībhi", ",;issannaṃ", ",;īhi,ībhi", ",;issannaṃ", ",;īsu", ";"];
paradn_pron["ti;i,n"] = [",;īṇi", ",;īṇi", ",;īhi,ībhi", ",;iṇṇaṃ,iṇṇanaṃ", ",;īhi,ībhi", ",;iṇṇaṃ,iṇṇanaṃ", ",;īsu", ";"];
paradn_pron["catu;u,m"] = [",;tāro,uro", ",;tāro,uro", ",;ūhi,ūbhi,ubbhi", ",;unnaṃ", ",;ūhi,ūbhi,ubbhi", ",;unnaṃ", ",;ūsu", ";"];
paradn_pron["catu;u,f"] = [",;asso", ",;asso", ",;ūhi,ūbhi,ubbhi", ",;assannaṃ", ",;ūhi,ūbhi,ubbhi", ",;assannaṃ", ",;ūsu", ";"];
paradn_pron["catu;u,n"] = [",;tāri", ",;tāri", ",;ūhi,ūbhi,ubbhi", ",;unnaṃ", ",;ūhi,ūbhi,ubbhi", ",;unnaṃ", ",;ūsu", ";"];
paradn_irrn["mana;a,m"] = ["o;ā", "aṃ;e", "ena,asā;ehi,ebhi", "assa,aso;ānaṃ", "asmā,amhā,ā;ehi,ebhi", "assa,aso;ānaṃ", "asmiṃ,amhi,asi,e;esu", "a,ā;ā"];
paradn_irrn["rāja;a,m"] = ["ā;āno", "aṃ,ānaṃ;āno", "ena,-2aññā;ūhi,ūbhi,ehi,ebhi", "ino,-2añño,-2aññassa;ānaṃ,ūnaṃ,-2aññaṃ", "-2aññā;ūhi,ūbhi,ehi,ebhi", "ino,-2añño,-2aññassa;ānaṃ,ūnaṃ,-2aññaṃ", "ini,-2aññe;ūsu,esu", "a,ā;āno"];
paradn_irrn["brahma;a,m"] = ["ā;āno", "aṃ,ānaṃ;āno", "unā;ehi,ebhi", "assa,uno;ānaṃ,ūnaṃ", "unā;ehi,ebhi", "assa,uno;ānaṃ,ūnaṃ", "ani;esu", "e;āno"];
paradn_irrn["atta;a,m"] = ["ā;ā,āno", "aṃ,ānaṃ;āno", "ena,anā;ehi,ebhi,anehi,anebhi", "assa,ano;ānaṃ", "anā;ehi,ebhi,anehi,anebhi", "assa,ano;ānaṃ", "ani;esu", "a,ā;āno"];
paradn_irrn["ātuma;a,m"] = ["ā;ā,āno", "aṃ,ānaṃ;āno", "ena;ehi,ebhi", "assa,āya,atthaṃ;ānaṃ", "asmā,ā;ehi,ebhi", "assa;ānaṃ", "asmiṃ,e;esu", "a,ā;āno"];
paradn_irrn["yuva;a,m"] = ["ā,āno;ā,āno,ānā", "aṃ,ānaṃ;e,āne", "ena,ānena,ānā;ehi,ebhi,ānehi,ānebhi", "assa,ānassa,ino;anaṃ,ānānaṃ", "ānasmā,ānā;ehi,ebhi,ānehi,ānebhi", "assa,ānassa,ino;anaṃ,ānānaṃ", "asmiṃ,ānasmiṃ,e,āne;esu,āsu,ānesu", "a,āna;āno,ānā"];
paradn_irrn["addhā;a,m"] = ["ā;ā,āno", "ānaṃ;āne", "unā;ānehi,ānebhi", "uno;ānaṃ", "unā;ānehi,ānebhi", "uno;ānaṃ", "ani,āne;ānesu", "a;ā,āno"];
paradn_irrn["muddhā;a,m"] = ["ā;ā,āno", "aṃ;e,āne", "ānā;ehi,ebhi", "assa;ānaṃ", "ānā;ehi,ebhi", "assa;ānaṃ", "ani;anesu", "a;ā,āno"];
paradn_irrn["kamma;a,n"] = ["aṃ;ā,āni", "aṃ;e,āni", "ena,unā,anā;ehi,ebhi", "assa,uno;ānaṃ", "asmā,amhā,unā,ā;ehi,ebhi", "assa,uno;ānaṃ", "asmiṃ,amhi,ani,e;esu", "a;ā,āni"];
paradn_irrn["kārī;i,n"] = ["i;ī,īni", "iṃ,inaṃ;ī,īni", "inā;īhi,ībhi", "issa,ino;īnaṃ", "ismā,imhā,inā;īhi,ībhi", "issa,ino;īnaṃ,inaṃ", "ismiṃ,imhi,ini;īsu", "i;ī,īni"];
paradn_irrn["sā;a,m"] = ["ā;ā", "aṃ;e", "ena;āhi,ābhi", "assa,āya;ānaṃ", "asmā,amhā,ā;āhi,ābhi", "assa;ānaṃ", "asmiṃ,amhi,e;āsu", "a,ā;ā"];
paradn_irrn["go;a,m"] = ["o;āvo,avo", "āvuṃ,āvaṃ,avaṃ;āvo,avo", "āvena,avena;ohi,obhi", "āvassa,avassa;avaṃ,unnaṃ,onaṃ", "āvasmā,āvamha,avasmā,avamha,āvā,avā;ohi,obhi", "āvassa,avassa;avaṃ,unnaṃ,onaṃ", "āvasmiṃ,āvamhi,avasmiṃ,avamhi,āve,ave;āvesu,avesu,osu", "o;āvo,avo"];
paradn_irrn["go;ā,f"] = paradn_irrn["go;a,m"];
paradn_irrn["satthu;u,m"] = ["ā;āro", "āraṃ;āre,āro", "ārā,unā;ārehi,ārebhi", "ussa,uno,u;ānaṃ,ārānaṃ", "ārā;ārehi,ārebhi", "ussa,uno,u;ānaṃ,ārānaṃ", "ari;āresu", "a,ā;āro"];
paradn_irrn["kattu;u,m"] = ["ā;āro", "āraṃ;āre,āro", "ārā,unā;ārehi,ārebhi", "ussa,uno,u;ānaṃ,ārānaṃ,ūnaṃ,unaṃ", "ārā,unā;ārehi,ārebhi", "ussa,uno,u;ānaṃ,ārānaṃ,ūnaṃ,unaṃ", "ari;āresu,ūsu,usu", "a,ā,e;āro"];
paradn_irrn["pitu;u,m"] = ["ā;aro", "araṃ;are,aro", "arā,unā;arehi,arebhi,ūhi,ūbhi,uhi,ubhi", "ussa,uno,u;arānaṃ,ānaṃ,ūnaṃ,unaṃ", "arā;arehi,arebhi,ūhi,ūbhi,uhi,ubhi", "ussa,uno,u;arānaṃ,ānaṃ,ūnaṃ,unaṃ", "ari;aresu,ūsu,usu", "a,ā;aro"];
paradn_irrn["mātu;u,f"] = ["ā;aro", "araṃ;are,aro", "arā,uyā;arehi,arebhi,ūhi,ūbhi,uhi,ubhi", "ussa,uyā,u;arānaṃ,ānaṃ,ūnaṃ,unaṃ", "arā,uyā;arehi,arebhi,ūhi,ūbhi,uhi,ubhi", "ussa,uyā,u;arānaṃ,ānaṃ,ūnaṃ,unaṃ", "ari,uyaṃ;aresu,ūsu,usu", "a,ā;aro"];
paradn_irrn["antcommon;t,m"] = [",;anto,antā", "antaṃ;ante", "antena,atā;antehi,antebhi", "antassa,ato;antānaṃ,ataṃ", "antasmā,antamhā,antā,atā;antehi,antebhi", "antassa,ato;antānaṃ,ataṃ", "antasmiṃ,antamhi,ante,ati;antesu", "a,ā,aṃ;anto,antā"];
paradn_irrn["guṇavant;t,m"] = ["ā;anto,antā", paradn_irrn["antcommon;t,m"][1], paradn_irrn["antcommon;t,m"][2], paradn_irrn["antcommon;t,m"][3], paradn_irrn["antcommon;t,m"][4], paradn_irrn["antcommon;t,m"][5], paradn_irrn["antcommon;t,m"][6], paradn_irrn["antcommon;t,m"][7]];
paradn_irrn["himavant;t,m"] = ["ā,anto;anto,antā", paradn_irrn["antcommon;t,m"][1], paradn_irrn["antcommon;t,m"][2], paradn_irrn["antcommon;t,m"][3], paradn_irrn["antcommon;t,m"][4], paradn_irrn["antcommon;t,m"][5], paradn_irrn["antcommon;t,m"][6], paradn_irrn["antcommon;t,m"][7]];
paradn_irrn["satimant;t,m"] = ["ā,anto;anto,antā", "antaṃ,aṃ;ante", paradn_irrn["antcommon;t,m"][2], "antassa,ato,assa;antānaṃ,ataṃ", paradn_irrn["antcommon;t,m"][4], "antassa,ato,assa;antānaṃ,ataṃ", paradn_irrn["antcommon;t,m"][6], paradn_irrn["antcommon;t,m"][7]];
paradn_irrn["guṇavant;t,f"] = ["atī,antī;atī,atiyo,antī,antiyo", "atiṃ,atiyaṃ,antiṃ,antiyaṃ;atī,atiyo,antī,antiyo", "atiyā,antiyā;atīhi,atībhi,antīhi,antībhi", "atiyā,antiyā;atīnaṃ,antīnaṃ", "atiyā,antiyā;atīhi,atībhi,antīhi,antībhi", "atiyā,antiyā;atīnaṃ,antīnaṃ", "atiyā,atiyaṃ,antiyā,antiyaṃ;atīsu,antīsu", "ati,anti;atī,atiyo,antī,antiyo"];
paradn_irrn["guṇavant;t,n"] = ["aṃ;anti,antāni", "antaṃ;ante,antāni", "antena,atā;antehi,antebhi", "antassa,ato;ataṃ,antānaṃ", "antasmā,antamhā,antā,atā;antehi,antebhi", "antassa,ato;ataṃ,antānaṃ", "antasmiṃ,antamhi,ante,ati;antesu", "a,ā,aṃ;anti,antāni"];
paradn_irrn["gacchanta;a,m"] = ["-3aṃ,-3anto;-3anto,-3antā", "-3antaṃ;-3ante,-3anto", "-3antena,-3atā;-3antehi,-3antebhi", "-3antassa,-3ato;-3antānaṃ,-3ataṃ", "-3antasmā,-3antamhā,-3antā,-3atā;-3antehi,-3antebhi", "-3antassa,-3ato;-3antānaṃ,-3ataṃ", "-3antasmiṃ,-3antamhi,-3ante,-3ati;-3antesu", "-3aṃ,-3a,-3ā;-3anto,-3antā"];
paradn_irrn["gacchanta;a,n"] = ["-3aṃ,-3antaṃ;-3antā,-3antāni", "-3antaṃ;-3ante,-3antāni", "-3antena,-3atā;-3antehi,-3antebhi", "-3antassa,-3ato;-3antānaṃ,-3ataṃ", "-3antasmā,-3antamhā,-3antā,-3atā;-3antehi,-3antebhi", "-3antassa,-3ato;-3antānaṃ,-3ataṃ", "-3antasmiṃ,-3antamhi,-3ante,-3ati;-3antesu", "-3anta;-3antā,-3antāni"];
paradn_irrn["bhavanta;a,m"] = ["-3aṃ;-3anto,-3antā,-5onto", "-3antaṃ;-3ante,-5onte", "-3antena,-3atā,-5otā;-3antehi,-3antebhi", "-3antassa,-3ato,-5oto;-3ataṃ,-3antānaṃ", "-3antasmā,-3antamhā,-3antā,-3atā,-5otā;-3antehi,-3antebhi", "-3antassa,-3ato,-5oto;-3ataṃ,-3antānaṃ", "-3antasmiṃ,-3antamhi,-3ante,-3ati;-3antesu", "-5o,-4nte,-5onta,-5ontā;-3anto,-3antā,-5onto"];
paradn_irrn["karonta;a,m"] = ["-3aṃ;o,ā", "aṃ;e", "ena,-2tā;ehi,ebhi", "assa,-2to;ānaṃ,-2taṃ", "asmā,amhā,ā,-2tā;ehi,ebhi", "assa,-2to;ānaṃ,-2taṃ", "asmiṃ,amhi,e;esu", "a;ā"];
paradn_irrn["arahanta;a,m"] = ["-3aṃ;o", "aṃ;e", "ena,-2tā;ehi,ebhi", "assa,-2to;ānaṃ,-2taṃ", "asmā,amhā,ā,-2tā;ehi,ebhi", "assa,-2to;ānaṃ,-2taṃ", "asmiṃ,amhi,e;esu", "a;o"];
paradn_irrn["santa;a,m"] = ["o,-2ṃ;o,ā", "aṃ,-2ṃ;e", "ena,-2tā;ehi,-2bbhi", "assa,-2to;ānaṃ,-2taṃ", "asmā,amhā,ā,-2tā;ehi,-2bbhi", "assa,-2to;ānaṃ,-2taṃ", "asmiṃ,amhi,e,-2ti;esu", "-2ṃ,-2,-3ā,a;o,ā"];
//
function combineEnding(stem, end) {
	if (end === undefined || end === "")
		return "";
	let result = stem;
	if (end.startsWith("-")) {
		const delNum = parseInt(end.slice(1,2));
		const realEnd = end.slice(2);
		result = result.slice(0, result.length-delNum) + realEnd;
	} else {
		result += end;
	}
	return result;
}
function getDeclensionAllStr(stem, endStr) {
	const endings = endStr.split(",");
	let result = combineEnding(stem, endings[0]);
	for (let i = 1; i < endings.length; i++) {
		result += ", " + combineEnding(stem, endings[i]);
	}
	if (result.trim() === ",")
		return "";
	else
		return result;	
}
function getGenericDeclensionStr(stem, group, cas, num) {
	const endingsStr = paradn_generic[group][cas].split(";")[num];
	return getDeclensionAllStr(stem, endingsStr);
}
function getPronounDeclensionStr(stem, group, cas, num) {
	const endingsStr = paradn_pron[group][cas].split(";")[num];
	return getDeclensionAllStr(stem, endingsStr);
}
function getIrrnDeclensionStr(stem, group, cas, num) {
	const endingsStr = paradn_irrn[group][cas].split(";")[num];
	return getDeclensionAllStr(stem, endingsStr);
}

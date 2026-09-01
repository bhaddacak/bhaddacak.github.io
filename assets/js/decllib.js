/*! decllib.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const declension = {};
declension.case_abbr = ["nom", "acc", "ins", "dat", "abl", "gen", "loc", "voc"];
declension.number_abbr = ["sg", "pl"];
declension.paradn_generic = {};
declension.paradn_pron = {};
declension.paradn_irrn = {};
declension.paradn_generic["a,m"] = ["o;ā", "aṃ;e", "ena;ehi,ebhi", "assa,āya,atthaṃ;ānaṃ", "asmā,amhā,ā;ehi,ebhi", "assa;ānaṃ", "asmiṃ,amhi,e;esu", "a,ā;ā"];
declension.paradn_generic["ā,f"] = ["ā;ā,āyo", "aṃ;ā,āyo", "āya;āhi,ābhi", "āya;ānaṃ", "āya;āhi,ābhi", "āya;ānaṃ", "āya,āyaṃ;āsu", "e;ā,āyo"];
declension.paradn_generic["a,n"] = ["aṃ;āni,ā", "aṃ;āni,e", "ena;ehi,ebhi", "assa;ānaṃ", "asmā,amhā,ā;ehi,ebhi", "assa;ānaṃ", "asmiṃ,amhi,e;esu", "a;ā,āni"];
declension.paradn_generic["i,m"] = ["i;ī,ayo", "iṃ;ī,ayo", "inā;īhi,ībhi,ihi,ibhi", "issa,ino;īnaṃ,inaṃ", "ismā,imhā,inā;īhi,ībhi,ihi,ibhi", "issa,ino;īnaṃ,inaṃ", "ismiṃ,imhi;īsu,isu", "i;ī,ayo"];
declension.paradn_generic["i,f"] = ["i;ī,iyo", "iṃ;ī,iyo", "iyā;īhi,ībhi,ihi,ibhi", "iyā;īnaṃ,inaṃ", "iyā;īhi,ībhi,ihi,ibhi", "iyā;īnaṃ,inaṃ", "iyā,iyaṃ;īsu,isu", "i;ī,iyo"];
declension.paradn_generic["i,n"] = ["i;īni,ī", "iṃ;īni,ī", "inā;īhi,ībhi,ihi,ibhi", "issa,ino;īnaṃ,inaṃ", "ismā,imhā,inā;īhi,ībhi,ihi,ibhi", "issa,ino;īnaṃ,inaṃ", "ismiṃ,imhi;īsu,isu", "i;ī,īni"];
declension.paradn_generic["ī,m"] = ["ī;ī,ino", "inaṃ,iṃ;ī,ino", "inā;īhi,ībhi", "issa,ino;īnaṃ", "ismā,imhā,inā;īhi,ībhi", "issa,ino;īnaṃ", "ismiṃ,imhi,ini;īsu", "i;ī,ino"];
declension.paradn_generic["ī,f"] = ["ī;ī,iyo", "iyaṃ,iṃ;ī,iyo", "iyā;īhi,ībhi", "iyā;īnaṃ", "iyā;īhi,ībhi", "iyā;īnaṃ", "iyā,iyaṃ;īsu", "i;ī,iyo"];
declension.paradn_generic["u,m"] = ["u;ū,avo", "uṃ;ū,avo", "unā;ūhi,ūbhi,uhi,ubhi", "ussa,uno;ūnaṃ,unaṃ", "usmā,umhā,unā;ūhi,ūbhi,uhi,ubhi", "ussa,uno;ūnaṃ,unaṃ", "usmiṃ,umhi;ūsu,usu", "u;ū,avo,ave"];
declension.paradn_generic["u,f"] = ["u;ū,uyo", "uṃ;ū,uyo", "uyā;ūhi,ūbhi,uhi,ubhi", "uyā;ūnaṃ,unaṃ", "uyā;ūhi,ūbhi,uhi,ubhi", "uyā;ūnaṃ,inaṃ", "uyā,uyaṃ;ūsu", "u;ū,uyo"];
declension.paradn_generic["u,n"] = ["u;ūni,ū", "uṃ;ūni,ū", "usā,unā;ūhi,ūbhi,uhi,ubhi", "ussa,uno;ūnaṃ,unaṃ", "usmā,umhā,unā;ūhi,ūbhi,uhi,ubhi", "ussa,uno;ūnaṃ,unaṃ", "usmiṃ,umhi;ūsu,usu", "u;ūni,ū"];
declension.paradn_generic["ū,m"] = ["ū;ū,uno", "uṃ;ū,uno", "unā;ūhi,ūbhi", "ussa,uno;ūnaṃ", "usmā,umhā,unā;ūhi,ūbhi", "ussa,uno;ūnaṃ", "usmiṃ,umhi;ūsu", "u;ū,uno"];
declension.paradn_generic["ū,f"] = ["ū;ū,uyo", "uṃ;ū,uyo", "uyā;ūhi,ūbhi", "uyā;ūnaṃ", "uyā;ūhi,ūbhi", "uyā;ūnaṃ", "uyā,uyaṃ;ūsu", "u;ū,uyo"];
declension.paradn_pron["tumha;a,m"] = ["-3vaṃ,-3uvaṃ;e,-4vo", "-3vaṃ,-3uvaṃ,-3avaṃ,-3aṃ;ākaṃ,e,-4vo", "-3ayā,-3vayā,-3e;ehi,ebhi,-4vo", "-2yhaṃ,aṃ,-3ava,-3e;aṃ,ākaṃ,-4vo", "-3ayā;ehi,ebhi", "-2yhaṃ,aṃ,-3ava,-3e;aṃ,ākaṃ,-4vo", "-3ayi,-3vayi;esu", ";"];
declension.paradn_pron["tumha;ā,f"] = ["-3vaṃ,-3uvaṃ;e,-4vo", "-3vaṃ,-3uvaṃ,-3avaṃ,-3aṃ;ākaṃ,e,-4vo", "-3ayā,-3vayā,-3e;ehi,ebhi,-4vo", "-2yhaṃ,aṃ,-3ava,-3e;aṃ,ākaṃ,-4vo", "-3ayā;ehi,ebhi", "-2yhaṃ,aṃ,-3ava,-3e;aṃ,ākaṃ,-4vo", "-3ayi,-3vayi;esu", ";"];
declension.paradn_pron["tumha;a,n"] = ["-3vaṃ,-3uvaṃ;e,-4vo", "-3vaṃ,-3uvaṃ,-3avaṃ,-3aṃ;ākaṃ,e,-4vo", "-3ayā,-3vayā,-3e;ehi,ebhi,-4vo", "-2yhaṃ,aṃ,-3ava,-3e;aṃ,ākaṃ,-4vo", "-3ayā;ehi,ebhi", "-2yhaṃ,aṃ,-3ava,-3e;aṃ,ākaṃ,-4vo", "-3ayi,-3vayi;esu", ";"];
declension.paradn_pron["amha;a,m"] = ["-2haṃ;-3mayaṃ,e,-3no", "-3maṃ,-3mamaṃ;ākaṃ,e,-3no", "-3mayā,-3me;ehi,ebhi,-3no", "-3mayhaṃ,aṃ,-3mama,-3mamaṃ,-3me;aṃ,ākaṃ,-2smākaṃ,-3no", "-3mayā;ehi,ebhi", "-3mayhaṃ,aṃ,-3mama,-3mamaṃ,-3me;aṃ,ākaṃ,-2smākaṃ,-3no", "-3mayi;esu", ";"];
declension.paradn_pron["amha;ā,f"] = ["-2haṃ;-3mayaṃ,e,-3no", "-3maṃ,-3mamaṃ;ākaṃ,e,-3no", "-3mayā,-3me;ehi,ebhi,-3no", "-3mayhaṃ,aṃ,-3mama,-3mamaṃ,-3me;aṃ,ākaṃ,-2smākaṃ,-3no", "-3mayā;ehi,ebhi", "-3mayhaṃ,aṃ,-3mama,-3mamaṃ,-3me;aṃ,ākaṃ,-2smākaṃ,-3no", "-3mayi;esu", ";"];
declension.paradn_pron["amha;a,n"] = ["-2haṃ;-3mayaṃ,e,-3no", "-3maṃ,-3mamaṃ;ākaṃ,e,-3no", "-3mayā,-3me;ehi,ebhi,-3no", "-3mayhaṃ,aṃ,-3mama,-3mamaṃ,-3me;aṃ,ākaṃ,-2smākaṃ,-3no", "-3mayā;ehi,ebhi", "-3mayhaṃ,aṃ,-3mama,-3mamaṃ,-3me;aṃ,ākaṃ,-2smākaṃ,-3no", "-3mayi;esu", ";"];
declension.paradn_pron["ta;a,m"] = ["-1so;e,-1ne", "aṃ,-1naṃ;e,-1ne", "ena,-1nena;ehi,ebhi,-1nehi,-1nebhi", "assa,-1assa,-1nassa;esaṃ,esānaṃ,-1nesaṃ,-1nesānaṃ", "asmā,amhā,-1asmā,-1nasmā,-1namhā;ehi,ebhi,-1nehi,-1nebhi", "assa,-1assa,-1nassa;esaṃ,esānaṃ,-1nesaṃ,-1nesānaṃ", "asmiṃ,amhi,-1asmiṃ,-1nasmiṃ,-1namhi;esu,-1nesu", ";"];
declension.paradn_pron["ta;ā,f"] = ["-1sā;ā,āyo,-1nā,-1nāyo", "aṃ,-1naṃ;ā,āyo,-1nā,-1nāyo", "āya,-1nāya;āhi,ābhi,-1nāhi,-1nābhi", "assā,issā,assāya,issāya,-1assā,-1nassā,-1assāya,-1nassāya,āya,-1nāya;āsaṃ,āsānaṃ,-1nāsaṃ,-1nāsānaṃ", "āya,-1nāya;āhi,ābhi,-1nāhi,-1nābhi", "assā,issā,assāya,issāya,-1assā,-1nassā,-1assāya,-1nassāya,āya,-1nāya;āsaṃ,āsānaṃ,-1nāsaṃ,-1nāsānaṃ", "assaṃ,issaṃ,-1assaṃ,-1nassaṃ,āya,-1nāya;āsu,-1nāsu", ";"];
declension.paradn_pron["ta;a,n"] = ["aṃ,-1naṃ;āni,-1nāni", "aṃ,-1naṃ;āni,-1nāni", "ena,-1nena;ehi,ebhi,-1nehi,-1nebhi", "assa,-1assa,-1nassa;esaṃ,esānaṃ,-1nesaṃ,-1nesānaṃ", "asmā,amhā,-1asmā,-1nasmā,-1namhā;ehi,ebhi,-1nehi,-1nebhi,", "assa,-1assa,-1nassa;esaṃ,esānaṃ,-1nesaṃ,-1nesānaṃ", "asmiṃ,amhi,-1asmiṃ,-1nasmiṃ,-1namhi;esu,-1nesu", ";"];
declension.paradn_pron["eta;a,m"] = ["-1so;e", "aṃ;e", "ena;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmā,amhā;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmiṃ,amhi;esu", ";"];
declension.paradn_pron["eta;ā,f"] = ["-1sā;ā,āyo", "aṃ;ā,āyo", "āya;āhi,ābhi", "āya,issā,issāya;āsaṃ,āsānaṃ", "āya;āhi,ābhi", "āya,issā,issāya;āsaṃ,āsānaṃ", "āyaṃ,issaṃ;āsu", ";"];
declension.paradn_pron["eta;a,n"] = ["aṃ;āni", "aṃ;āni", "ena;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmā,amhā;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmiṃ,amhi;esu", ";"];
declension.paradn_pron["ima;a,m"] = ["-2ayaṃ;e", "aṃ;e", "inā,-2anena;ehi,ebhi,-2ehi,-2ebhi", "assa,-2assa;esaṃ,esānaṃ,-2esaṃ,-2esānaṃ", "asmā,amhā,-2asmā;ehi,ebhi,-2ehi,-2ebhi", "assa,-2assa;esaṃ,esānaṃ,-2esaṃ,-2esānaṃ", "asmiṃ,amhi,-2asmiṃ;esu,-2esu", ";"];
declension.paradn_pron["ima;ā,f"] = ["-2ayaṃ;ā,āyo", "aṃ;ā,āyo", "āya;āhi,ābhi", "āya,issā,issāya,-2assā,-2assāya;āsaṃ,āsānaṃ", "āya;āhi,ābhi", "āya,issā,issāya,-2assā,-2assāya;āsaṃ,āsānaṃ", "āyaṃ,issā,issaṃ,-2assaṃ;āsu", ";"];
declension.paradn_pron["ima;a,n"] = ["-1daṃ,aṃ;āni", "-1daṃ,aṃ;āni", "inā,-2anena;ehi,ebhi,-2ehi,-2ebhi", "assa,-2assa;esaṃ,esānaṃ,-2esaṃ,-2esānaṃ", "asmā,amhā,-2asmā;ehi,ebhi,-2ehi,-2ebhi", "assa,-2assa;esaṃ,esānaṃ,-2esaṃ,-2esānaṃ", "asmiṃ,amhi,-2asmiṃ;esu,-2esu", ";"];
declension.paradn_pron["amu;u,m"] = ["-1su;ū", "uṃ;ū", "unā;ūhi,ūbhi,uhi,ubhi", "ussa,-1dussa;ūsaṃ,ūsānaṃ,usaṃ,usānaṃ", "usmā,umhā;ūhi,ūbhi,uhi,ubhi", "ussa,-1dussa;ūsaṃ,ūsānaṃ,usaṃ,usānaṃ", "usmiṃ,umhi;ūsu,usu", ";"];
declension.paradn_pron["amu;u,f"] = ["-1su;ū,uyo", "uṃ;ū,uyo", "uyā;ūhi,ūbhi", "ussā,uyā;ūsaṃ,ūsānaṃ", "uyā;ūhi,ūbhi", "ussā,uyā;ūsaṃ,ūsānaṃ", "ussaṃ,uyaṃ,uyā;ūsu", ";"];
declension.paradn_pron["amu;u,n"] = ["-1duṃ;ū,ūni", "-1duṃ;ū,ūni", "unā;ūhi,ūbhi,uhi,ubhi", "ussa,-1dussa;ūsaṃ,ūsānaṃ,usaṃ,usānaṃ", "usmā,umhā;ūhi,ūbhi,uhi,ubhi", "ussa,-1dussa;ūsaṃ,ūsānaṃ,usaṃ,usānaṃ", "usmiṃ,umhi;ūsu,usu", ";"];
declension.paradn_pron["kiṃ;a,m"] = ["o;e", "aṃ;e", "ena;ehi,ebhi", "assa,issa;esaṃ,esānaṃ", "asmā,amhā;ehi,ebhi", "assa,issa;esaṃ,esānaṃ", "asmiṃ,amhi,ismiṃ,imhi;esu", ";"];
declension.paradn_pron["kiṃ;ā,f"] = ["ā;ā,āyo", "aṃ;ā,āyo", "āya;āhi,ābhi", "assā,āya;āsaṃ,āsānaṃ", "āya;āhi,ābhi", "assā,āya;āsaṃ,āsānaṃ", "assaṃ,āyaṃ;āsu", ";"];
declension.paradn_pron["kiṃ;a,n"] = ["iṃ;āni", "iṃ;āni", "ena;ehi,ebhi", "assa,issa;esaṃ,esānaṃ", "asmā,amhā;ehi,ebhi", "assa,issa;esaṃ,esānaṃ", "asmiṃ,amhi,ismiṃ,imhi;esu", ";"];
declension.paradn_pron["kiṃci;i,m"] = ["-3oci;-3eci", "-3añci;-3eci", "-3enaci;-3ehici", "-3assaci;-3esañci", "-3asmāci;-3ehici", "-3assaci;-3esañci", "-3asmiñci,-3ismiñci;-3esuci", ";"];
declension.paradn_pron["kiṃci;i,f"] = ["-3āci;-3āci", "-3añci;-3āci", "-3āyaci;-3āhici", "-3āyaci,-2assāci;-3āsañci", "-3āyaci;-3āhici", "-3āyaci,-2assāci;-3āsañci", "-3āyaci;-3āsuci", ";"];
declension.paradn_pron["kiṃci;i,n"] = ["-3iñci;-3ānici", "-3iñci;-3ānici", "-3enaci;-3ehici", "-3assaci;-3esañci", "-3asmāci;-3ehici", "-3assaci;-3esañci", "-3asmiñci,-3ismiñci;-3esuci", ";"];
declension.paradn_pron["sabba;a,m"] = ["o;e", "aṃ;e", "ena;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmā,amhā;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmiṃ,amhi;esu", "a,ā;e"];
declension.paradn_pron["sabba;ā,f"] = ["ā;ā,āyo", "aṃ;ā,āyo", "āya;āhi,ābhi", "assā,āya;āsaṃ,āsānaṃ", "āya;āhi,ābhi", "assā,āya;āsaṃ,āsānaṃ", "assaṃ,āyaṃ;āsu", "e;ā,āyo"];
declension.paradn_pron["sabba;a,n"] = ["aṃ;āni", "aṃ;āni", "ena;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmā,amhā;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmiṃ,amhi;esu", "a;āni"];
declension.paradn_pron["pubba;a,m"] = ["o;e,ā", "aṃ;e", "ena;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmā,amhā,ā;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmiṃ,amhi,e;esu", "a;e,ā"];
declension.paradn_pron["pubba;ā,f"] = ["ā;ā,āyo", "aṃ;ā,āyo", "āya;āhi,ābhi", "assā,āya;āsaṃ,āsānaṃ", "āya;āhi,ābhi", "assā,āya;āsaṃ,āsānaṃ", "assaṃ,āyaṃ;āsu", "e;ā,āyo"];
declension.paradn_pron["pubba;a,n"] = ["aṃ;āni", "aṃ;āni", "ena;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmā,amhā,ā;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmiṃ,amhi,e;esu", "a;āni"];
declension.paradn_pron["ya;a,m"] = ["o;e", "aṃ;e", "ena;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmā,amhā;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmiṃ,amhi;esu", ";"];
declension.paradn_pron["ya;ā,f"] = ["ā;ā,āyo", "aṃ;ā,āyo", "āya;āhi,ābhi", "assā,āya;āsaṃ,āsānaṃ", "āya;āhi,ābhi", "assā,āya;āsaṃ,āsānaṃ", "assaṃ,āyaṃ;āsu", ";"];
declension.paradn_pron["ya;a,n"] = ["aṃ;āni", "aṃ;āni", "ena;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmā,amhā;ehi,ebhi", "assa;esaṃ,esānaṃ", "asmiṃ,amhi;esu", ";"];
declension.paradn_pron["eka;a,m"] = ["o;,", "aṃ;,", "ena;,", "assa;,", "asmā,amhā;,", "assa;,", "asmiṃ,amhi;,", ";"];
declension.paradn_pron["eka;ā,f"] = ["ā;,", "aṃ;,", "āya;,", "issā,āya;,", "āya;,", "issā,āya;,", "issaṃ,āyaṃ;,", ";"];
declension.paradn_pron["eka;a,n"] = ["aṃ;,", "aṃ;,", "ena;,", "assa;,", "asmā,amhā;,", "assa;,", "asmiṃ,amhi;,", ";"];
declension.paradn_pron["ubho;a,m"] = [",;o,e", ",;o,e", ",;ohi,obhi,ehi,ebhi", ",;innaṃ", ",;ohi,obhi,ehi,ebhi", ",;innaṃ", ",;osu,esu", ";"];
declension.paradn_pron["ubho;ā,f"] = [",;o,e", ",;o,e", ",;ohi,obhi,ehi,ebhi", ",;innaṃ", ",;ohi,obhi,ehi,ebhi", ",;innaṃ", ",;osu,esu", ";"];
declension.paradn_pron["ubho;a,n"] = [",;o,e", ",;o,e", ",;ohi,obhi,ehi,ebhi", ",;innaṃ", ",;ohi,obhi,ehi,ebhi", ",;innaṃ", ",;osu,esu", ";"];
declension.paradn_pron["dvi;i,m"] = [",;e,-1uve", ",;e,-1uve", ",;īhi,ībhi", ",;innaṃ,-1uvinnaṃ", ",;īhi,ībhi", ",;innaṃ,-1uvinnaṃ", ",;īsu", ";"];
declension.paradn_pron["dvi;i,f"] = [",;e,-1uve", ",;e,-1uve", ",;īhi,ībhi", ",;innaṃ,-1uvinnaṃ", ",;īhi,ībhi", ",;innaṃ,-1uvinnaṃ", ",;īsu", ";"];
declension.paradn_pron["dvi;i,n"] = [",;e,-1uve", ",;e,-1uve", ",;īhi,ībhi", ",;innaṃ,-1uvinnaṃ", ",;īhi,ībhi", ",;innaṃ,-1uvinnaṃ", ",;īsu", ";"];
declension.paradn_pron["ti;i,m"] = [",;ayo", ",;ayo", ",;īhi,ībhi", ",;iṇṇaṃ,iṇṇanaṃ", ",;īhi,ībhi", ",;iṇṇaṃ,iṇṇanaṃ", ",;īsu", ";"];
declension.paradn_pron["ti;i,f"] = [",;isso", ",;isso", ",;īhi,ībhi", ",;issannaṃ", ",;īhi,ībhi", ",;issannaṃ", ",;īsu", ";"];
declension.paradn_pron["ti;i,n"] = [",;īṇi", ",;īṇi", ",;īhi,ībhi", ",;iṇṇaṃ,iṇṇanaṃ", ",;īhi,ībhi", ",;iṇṇaṃ,iṇṇanaṃ", ",;īsu", ";"];
declension.paradn_pron["catu;u,m"] = [",;tāro,uro", ",;tāro,uro", ",;ūhi,ūbhi,ubbhi", ",;unnaṃ", ",;ūhi,ūbhi,ubbhi", ",;unnaṃ", ",;ūsu", ";"];
declension.paradn_pron["catu;u,f"] = [",;asso", ",;asso", ",;ūhi,ūbhi,ubbhi", ",;assannaṃ", ",;ūhi,ūbhi,ubbhi", ",;assannaṃ", ",;ūsu", ";"];
declension.paradn_pron["catu;u,n"] = [",;tāri", ",;tāri", ",;ūhi,ūbhi,ubbhi", ",;unnaṃ", ",;ūhi,ūbhi,ubbhi", ",;unnaṃ", ",;ūsu", ";"];
declension.paradn_irrn["mana;a,m"] = ["o;ā", "aṃ;e", "ena,asā;ehi,ebhi", "assa,aso;ānaṃ", "asmā,amhā,ā;ehi,ebhi", "assa,aso;ānaṃ", "asmiṃ,amhi,asi,e;esu", "a,ā;ā"];
declension.paradn_irrn["rāja;a,m"] = ["ā;āno", "aṃ,ānaṃ;āno", "ena,-2aññā;ūhi,ūbhi,ehi,ebhi", "ino,-2añño,-2aññassa;ānaṃ,ūnaṃ,-2aññaṃ", "-2aññā;ūhi,ūbhi,ehi,ebhi", "ino,-2añño,-2aññassa;ānaṃ,ūnaṃ,-2aññaṃ", "ini,-2aññe;ūsu,esu", "a,ā;āno"];
declension.paradn_irrn["brahma;a,m"] = ["ā;āno", "aṃ,ānaṃ;āno", "unā;ehi,ebhi", "assa,uno;ānaṃ,ūnaṃ", "unā;ehi,ebhi", "assa,uno;ānaṃ,ūnaṃ", "ani;esu", "e;āno"];
declension.paradn_irrn["atta;a,m"] = ["ā;ā,āno", "aṃ,ānaṃ;āno", "ena,anā;ehi,ebhi,anehi,anebhi", "assa,ano;ānaṃ", "anā;ehi,ebhi,anehi,anebhi", "assa,ano;ānaṃ", "ani;esu", "a,ā;āno"];
declension.paradn_irrn["ātuma;a,m"] = ["ā;ā,āno", "aṃ,ānaṃ;āno", "ena;ehi,ebhi", "assa,āya,atthaṃ;ānaṃ", "asmā,ā;ehi,ebhi", "assa;ānaṃ", "asmiṃ,e;esu", "a,ā;āno"];
declension.paradn_irrn["yuva;a,m"] = ["ā,āno;ā,āno,ānā", "aṃ,ānaṃ;e,āne", "ena,ānena,ānā;ehi,ebhi,ānehi,ānebhi", "assa,ānassa,ino;anaṃ,ānānaṃ", "ānasmā,ānā;ehi,ebhi,ānehi,ānebhi", "assa,ānassa,ino;anaṃ,ānānaṃ", "asmiṃ,ānasmiṃ,e,āne;esu,āsu,ānesu", "a,āna;āno,ānā"];
declension.paradn_irrn["addhā;a,m"] = ["ā;ā,āno", "ānaṃ;āne", "unā;ānehi,ānebhi", "uno;ānaṃ", "unā;ānehi,ānebhi", "uno;ānaṃ", "ani,āne;ānesu", "a;ā,āno"];
declension.paradn_irrn["muddhā;a,m"] = ["ā;ā,āno", "aṃ;e,āne", "ānā;ehi,ebhi", "assa;ānaṃ", "ānā;ehi,ebhi", "assa;ānaṃ", "ani;anesu", "a;ā,āno"];
declension.paradn_irrn["kamma;a,n"] = ["aṃ;ā,āni", "aṃ;e,āni", "ena,unā,anā;ehi,ebhi", "assa,uno;ānaṃ", "asmā,amhā,unā,ā;ehi,ebhi", "assa,uno;ānaṃ", "asmiṃ,amhi,ani,e;esu", "a;ā,āni"];
declension.paradn_irrn["kārī;i,n"] = ["i;ī,īni", "iṃ,inaṃ;ī,īni", "inā;īhi,ībhi", "issa,ino;īnaṃ", "ismā,imhā,inā;īhi,ībhi", "issa,ino;īnaṃ,inaṃ", "ismiṃ,imhi,ini;īsu", "i;ī,īni"];
declension.paradn_irrn["sā;a,m"] = ["ā;ā", "aṃ;e", "ena;āhi,ābhi", "assa,āya;ānaṃ", "asmā,amhā,ā;āhi,ābhi", "assa;ānaṃ", "asmiṃ,amhi,e;āsu", "a,ā;ā"];
declension.paradn_irrn["go;a,m"] = ["o;āvo,avo", "āvuṃ,āvaṃ,avaṃ;āvo,avo", "āvena,avena;ohi,obhi", "āvassa,avassa;avaṃ,unnaṃ,onaṃ", "āvasmā,āvamha,avasmā,avamha,āvā,avā;ohi,obhi", "āvassa,avassa;avaṃ,unnaṃ,onaṃ", "āvasmiṃ,āvamhi,avasmiṃ,avamhi,āve,ave;āvesu,avesu,osu", "o;āvo,avo"];
declension.paradn_irrn["go;ā,f"] = declension.paradn_irrn["go;a,m"];
declension.paradn_irrn["satthu;u,m"] = ["ā;āro", "āraṃ;āre,āro", "ārā,unā;ārehi,ārebhi", "ussa,uno,u;ānaṃ,ārānaṃ", "ārā;ārehi,ārebhi", "ussa,uno,u;ānaṃ,ārānaṃ", "ari;āresu", "a,ā;āro"];
declension.paradn_irrn["kattu;u,m"] = ["ā;āro", "āraṃ;āre,āro", "ārā,unā;ārehi,ārebhi", "ussa,uno,u;ānaṃ,ārānaṃ,ūnaṃ,unaṃ", "ārā,unā;ārehi,ārebhi", "ussa,uno,u;ānaṃ,ārānaṃ,ūnaṃ,unaṃ", "ari;āresu,ūsu,usu", "a,ā,e;āro"];
declension.paradn_irrn["pitu;u,m"] = ["ā;aro", "araṃ;are,aro", "arā,unā;arehi,arebhi,ūhi,ūbhi,uhi,ubhi", "ussa,uno,u;arānaṃ,ānaṃ,ūnaṃ,unaṃ", "arā;arehi,arebhi,ūhi,ūbhi,uhi,ubhi", "ussa,uno,u;arānaṃ,ānaṃ,ūnaṃ,unaṃ", "ari;aresu,ūsu,usu", "a,ā;aro"];
declension.paradn_irrn["mātu;u,f"] = ["ā;aro", "araṃ;are,aro", "arā,uyā;arehi,arebhi,ūhi,ūbhi,uhi,ubhi", "ussa,uyā,u;arānaṃ,ānaṃ,ūnaṃ,unaṃ", "arā,uyā;arehi,arebhi,ūhi,ūbhi,uhi,ubhi", "ussa,uyā,u;arānaṃ,ānaṃ,ūnaṃ,unaṃ", "ari,uyaṃ;aresu,ūsu,usu", "a,ā;aro"];
declension.paradn_irrn["antcommon;t,m"] = [",;anto,antā", "antaṃ;ante", "antena,atā;antehi,antebhi", "antassa,ato;antānaṃ,ataṃ", "antasmā,antamhā,antā,atā;antehi,antebhi", "antassa,ato;antānaṃ,ataṃ", "antasmiṃ,antamhi,ante,ati;antesu", "a,ā,aṃ;anto,antā"];
declension.paradn_irrn["guṇavant;t,m"] = ["ā;anto,antā", declension.paradn_irrn["antcommon;t,m"][1], declension.paradn_irrn["antcommon;t,m"][2], declension.paradn_irrn["antcommon;t,m"][3], declension.paradn_irrn["antcommon;t,m"][4], declension.paradn_irrn["antcommon;t,m"][5], declension.paradn_irrn["antcommon;t,m"][6], declension.paradn_irrn["antcommon;t,m"][7]];
declension.paradn_irrn["himavant;t,m"] = ["ā,anto;anto,antā", declension.paradn_irrn["antcommon;t,m"][1], declension.paradn_irrn["antcommon;t,m"][2], declension.paradn_irrn["antcommon;t,m"][3], declension.paradn_irrn["antcommon;t,m"][4], declension.paradn_irrn["antcommon;t,m"][5], declension.paradn_irrn["antcommon;t,m"][6], declension.paradn_irrn["antcommon;t,m"][7]];
declension.paradn_irrn["satimant;t,m"] = ["ā,anto;anto,antā", "antaṃ,aṃ;ante", declension.paradn_irrn["antcommon;t,m"][2], "antassa,ato,assa;antānaṃ,ataṃ", declension.paradn_irrn["antcommon;t,m"][4], "antassa,ato,assa;antānaṃ,ataṃ", declension.paradn_irrn["antcommon;t,m"][6], declension.paradn_irrn["antcommon;t,m"][7]];
declension.paradn_irrn["guṇavant;t,f"] = ["atī,antī;atī,atiyo,antī,antiyo", "atiṃ,atiyaṃ,antiṃ,antiyaṃ;atī,atiyo,antī,antiyo", "atiyā,antiyā;atīhi,atībhi,antīhi,antībhi", "atiyā,antiyā;atīnaṃ,antīnaṃ", "atiyā,antiyā;atīhi,atībhi,antīhi,antībhi", "atiyā,antiyā;atīnaṃ,antīnaṃ", "atiyā,atiyaṃ,antiyā,antiyaṃ;atīsu,antīsu", "ati,anti;atī,atiyo,antī,antiyo"];
declension.paradn_irrn["guṇavant;t,n"] = ["aṃ;anti,antāni", "antaṃ;ante,antāni", "antena,atā;antehi,antebhi", "antassa,ato;ataṃ,antānaṃ", "antasmā,antamhā,antā,atā;antehi,antebhi", "antassa,ato;ataṃ,antānaṃ", "antasmiṃ,antamhi,ante,ati;antesu", "a,ā,aṃ;anti,antāni"];
declension.paradn_irrn["gacchanta;a,m"] = ["-3aṃ,-3anto;-3anto,-3antā", "-3antaṃ;-3ante,-3anto", "-3antena,-3atā;-3antehi,-3antebhi", "-3antassa,-3ato;-3antānaṃ,-3ataṃ", "-3antasmā,-3antamhā,-3antā,-3atā;-3antehi,-3antebhi", "-3antassa,-3ato;-3antānaṃ,-3ataṃ", "-3antasmiṃ,-3antamhi,-3ante,-3ati;-3antesu", "-3aṃ,-3a,-3ā;-3anto,-3antā"];
declension.paradn_irrn["gacchanta;a,n"] = ["-3aṃ,-3antaṃ;-3antā,-3antāni", "-3antaṃ;-3ante,-3antāni", "-3antena,-3atā;-3antehi,-3antebhi", "-3antassa,-3ato;-3antānaṃ,-3ataṃ", "-3antasmā,-3antamhā,-3antā,-3atā;-3antehi,-3antebhi", "-3antassa,-3ato;-3antānaṃ,-3ataṃ", "-3antasmiṃ,-3antamhi,-3ante,-3ati;-3antesu", "-3anta;-3antā,-3antāni"];
declension.paradn_irrn["bhavanta;a,m"] = ["-3aṃ;-3anto,-3antā,-5onto", "-3antaṃ;-3ante,-5onte", "-3antena,-3atā,-5otā;-3antehi,-3antebhi", "-3antassa,-3ato,-5oto;-3ataṃ,-3antānaṃ", "-3antasmā,-3antamhā,-3antā,-3atā,-5otā;-3antehi,-3antebhi", "-3antassa,-3ato,-5oto;-3ataṃ,-3antānaṃ", "-3antasmiṃ,-3antamhi,-3ante,-3ati;-3antesu", "-5o,-4nte,-5onta,-5ontā;-3anto,-3antā,-5onto"];
declension.paradn_irrn["karonta;a,m"] = ["-3aṃ;o,ā", "aṃ;e", "ena,-2tā;ehi,ebhi", "assa,-2to;ānaṃ,-2taṃ", "asmā,amhā,ā,-2tā;ehi,ebhi", "assa,-2to;ānaṃ,-2taṃ", "asmiṃ,amhi,e;esu", "a;ā"];
declension.paradn_irrn["arahanta;a,m"] = ["-3aṃ;o", "aṃ;e", "ena,-2tā;ehi,ebhi", "assa,-2to;ānaṃ,-2taṃ", "asmā,amhā,ā,-2tā;ehi,ebhi", "assa,-2to;ānaṃ,-2taṃ", "asmiṃ,amhi,e;esu", "a;o"];
declension.paradn_irrn["santa;a,m"] = ["o,-2ṃ;o,ā", "aṃ,-2ṃ;e", "ena,-2tā;ehi,-2bbhi", "assa,-2to;ānaṃ,-2taṃ", "asmā,amhā,ā,-2tā;ehi,-2bbhi", "assa,-2to;ānaṃ,-2taṃ", "asmiṃ,amhi,e,-2ti;esu", "-2ṃ,-2,-3ā,a;o,ā"];
declension.paradn_irrn["mahanta;a,m"] = ["-3aṃ,-3ā,-3anto;-3antā", "-3antaṃ;-3ante", "-3antena,-3atā;-3antehi,-3antebhi", "-3antassa,-3ato;-3antānaṃ,-3ataṃ", "-3antasmā,-3antamhā,-3antā,-3atā;-3antehi,-3antebhi", "-3antassa,-3ato;-3antānaṃ,-3ataṃ", "-3antasmiṃ,-3antamhi,-3ante,-3ati;-3antesu", "-3a,-3ā;-3anto"];
//
declension.combineEnding = function(stem, end) {
	if (end === undefined || end === "")
		return "";
	let result = stem;
	if (end.startsWith("-")) {
		const delNum = parseInt(end.slice(1,2));
		const realEnd = end.slice(2);
		result = result.slice(0, -delNum) + realEnd;
	} else {
		result += end;
	}
	return result;
};
declension.getDeclensionAllStr = function(stem, endStr) {
	const endings = endStr.split(",");
	let result = this.combineEnding(stem, endings[0]);
	for (let i = 1; i < endings.length; i++) {
		result += ", " + this.combineEnding(stem, endings[i]);
	}
	if (result.trim() === ",")
		return "";
	else
		return result;	
};
declension.getDeclensionAllArr = function(stem, endStr) {
	const endings = endStr.split(",");
	const result = [];
	for (let i=0; i<endings.length; i++) {
		if (endings[i].length === 0) continue;
		result.push(this.combineEnding(stem, endings[i]));
	}
	return result;	
};
declension.getGenericDeclensionStr = function(stem, group, cas, num) {
	const endingsStr = declension.paradn_generic[group][cas].split(";")[num];
	return declension.getDeclensionAllStr(stem, endingsStr);
};
declension.getPronounDeclensionStr = function(stem, group, cas, num) {
	const endingsStr = declension.paradn_pron[group][cas].split(";")[num];
	return declension.getDeclensionAllStr(stem, endingsStr);
};
declension.getIrrnDeclensionStr = function(stem, group, cas, num) {
	const endingsStr = declension.paradn_irrn[group][cas].split(";")[num];
	return declension.getDeclensionAllStr(stem, endingsStr);
};
declension.getPronounDeclensionAll = function(stem, group) {
	const parad = declension.paradn_pron;
	return declension.getDeclensionAll(stem, group, parad);
};
declension.getIrrnDeclensionAll = function(stem, group) {
	const parad = declension.paradn_irrn;
	return declension.getDeclensionAll(stem, group, parad);
};
declension.getDeclensionAll = function(stem, group, parad) {
	const decl = new DeclProduct();
	for (let c=0; c<8; c++) {
		const nums = parad[group][c].split(";");
		for (let n=0; n<nums.length; n++) {
			const words = declension.getDeclensionAllArr(stem, nums[n]);
			for (let w=0; w<words.length; w++)
				decl.addTerm(words[w], c, n);
		}
	}
	return decl.getProduct();
};
//
const DeclProduct = function() {
	this.product = {};
	this.addTerm = function(term, cas, num) {
		if (term in this.product) {
			const info = this.product[term];
			if (info.cas.indexOf(cas) === -1) info.cas.push(cas);
			if (info.num.indexOf(num) === -1) info.num.push(num);
			this.product[term] = info;
		} else {
			this.product[term] = { cas: [ cas ], num: [ num ] };
		}
	};
	this.getProduct = function() {
		return this.product;
	};
	this.mergeWith = function(product) {
		for (const term in product) {
			const info = product[term];
			this.addTerm(term, info.cas, info.num);
		}
		return this.product;
	};
};

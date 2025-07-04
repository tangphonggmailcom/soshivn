// FS SCORM - ADL SCORM 2004 用の fscommand アダプタと Flash MX 2004 相互学習システム
// バージョン 1.0    12/10/04
// Modified by Andrew Chemey, Macromedia
// FS SCORM アダプタバージョン1.2.4 に基づく :
// 		Fragments Copyright 2002 Pathlore Software Corporation All rights Reserved
// 		Fragments Copyright 2002 Macromedia Inc. All rights reserved.
// 		Fragments Copyright 2003 Click2learn, Inc. All rights reserved.
// 		Developed by Tom King, Macromedia,
// 		             Leonard Greenberg, Pathlore,
// 		             and Claude Ostyn, Click2learn, Inc.
// 		Includes code by Jeff Burton and Andrew Chemey, Macromedia (01/09/02)
// -----------------------------------------------------------------
// これらのプリセット値は好みと要件に合わせて変更してください。
// API オブジェクトの検索方法 (0 - 下から上へ検索、1 - 上から下へ検索)
// var g_intAPIOrder = 1;
var g_bShowApiErrors = false; 	// エラーメッセージを表示する場合は true に変更
var g_bInitializeOnLoad = true; // HTML ページのロード時に LMS を初期化しない場合は false に変更
// g_bShowApiErrors が true の場合にこれらのストリングを変換
// アプリケーションをローカライズする必要もあります
var g_strAPINotFound = "Management system interface not found.";
var g_strAPITooDeep = "Cannot find API - too deeply nested.";
var g_strAPIInitFailed = "Found API but LMSInitialize failed.";
var g_strAPISetError = "Trying to set value but API not available.";
var g_strFSAPIError = 'LMS API adapter returned error code: "%1"\nWhen FScommand called API.%2\nwith "%3"';
var g_strDisableErrorMsgs = "Select cancel to disable future warnings.";
// LMSFinish の呼び出し時にステータスを自動的に完了済みに設定する場合は、
// g_bSetCompletedAutomatically を true に変更します。通常、
// Flash ムービーそのものがステータスを "完了済み"、"処理済み"、"失敗"
// (どちらも "完了済み" を示す) にするために FSCommand を送信して、完了ステータスを設定した場合、
// このフラッグは false のままです
var g_bSetCompletedAutomatically = false;
// この値は通常 LMS により指定されますが、この場合は異なります
// これが、処理済/失敗の判定に使用されるデフォルト値です。
// Flash の Actionscript が処理済/失敗の判定に独自のメソッドを使用している場合は、
// これを null に設定し、それ以外の場合は 0 ～ 1 の範囲で値を設定します
// (浮動小数の値たとえば "0.75" のこともあります
var g_SCO_MasteryScore = null; // 許容値 : 0.0 ～ 1.0、または null
//==================================================================
// 警告!!!
// 具体的な処理内容が明確にわかっていない限り、
// この行より下の部分は一切変更しないでください!
// これらの 2 つの値は、Flash テンプレートのプリセットの基本となるため、
// 変更しないでください。
var g_nSCO_ScoreMin = 0; 		// 数値でなければなりません
var g_nSCO_ScoreMax = 100; 		// nSCO_Score_Min より大きい数値でなければなりません
// LMS で指定されるマスタースコアがある場合は、合格/不合格の判断を
// するときスコアを解釈する必要があるかどうかの判断において、
// そのマスタースコアが SCORM 仕様に基づいて SCO より優先されます。
// テンプレートはマスタースコアの取得を試み、取得が可能な場合は
// それに従って、SCO がスコアを送信するときにステータスを
// 合格または不合格に設定します。実際には、SCO が終了するまで 
// LMS はこの決定を行いません。
// このフラグのデフォルト値は true です。LMS が合格/不合格の
// ステータスをマスタースコアに基づいて設定する方法を予測しない
// 場合には、false に設定します (最終的には LMS が勝ちます)。
var g_bInterpretMasteryScore = false;
// このスクリプトにより、SCO の一般的な論理ビヘイビアの
// さまざまな特徴を実行します。
/////////// API インターフェイスの初期化とキャッチャー関数 ////////
var g_nFindAPITries = 0;
var g_objAPI = null;
var g_bInitDone = false;
var g_bFinishDone = false;
var	g_bSCOBrowse = false;
var g_dtmInitialized = new Date(); // 初期化後に調整されます
var g_bMasteryScoreInitialized = false;
var g_varInterval = "";			// グローバル間隔
var g_intIntervalSecs = 10; 		// SCORM API のロードを待機する秒数
var g_intPollSecs = 0.25;			// API をポーリングする秒数
var g_intCurrentTime = new Date().getTime();
var g_intAPI = 0;				// 検索を開始する API のタイプ。使用可能な値 : 0 - SCORM 2004、1 - SCORM 1.2 (または 1.1)
var g_aryAPI = ["1.0", "0.2"];	// API のバージョンを格納する配列
var g_strAPIVersion = -1;
//---
var onloadFlg = false;
//---
function AlertUserOfAPIError(strText) {
	if (g_bShowApiErrors) {
		var s = strText + "\n\n" + g_strDisableErrorMsgs;
		if (!confirm(s)){
			g_bShowApiErrors = false;
		}
	}
}
function ExpandString(s){
	var re = new RegExp("%","g");
	for (i = arguments.length-1; i > 0; i--){
		s2 = "%" + i;
		if (s.indexOf(s2) > -1){
			re.compile(s2,"g");
			s = s.replace(re, arguments[i]);
		}
	}
	return s;
}
function findAPI(win)
{
	// SCORM 2004 に対応する API_1484_11 というオブジェクトまたは SCORM 1.2 以下に対応する API というオブジェクトを、ウィンドウ階層中で検索します
	// 現在のウィンドウを検索し、すべての子フレームを再帰的に検索します
	if(g_intAPI == 0)
	{
		if(win.API_1484_11 != null)
		{
			return win.API_1484_11;
		}
	} else if(g_intAPI == 1 || g_intAPI == "") {
		if (win.API != null)
		{
			g_strAPIVersion = g_aryAPI[g_intAPI];
			return win.API;
		}
	}
	if (win.length > 0)  // フレームの確認
	{
		for (var i=0;i<win.length;i++)
		{
			var objAPI = findAPI(win.frames[i]);
			if (objAPI != null)
			{
				return objAPI;
			}
		}
	}
	return null;
}
function getAPI(intAPISearchOrder)
{
	//alert("getAPI");

	// intAPISearchOrder が 0 の場合、現在のウィンドウから上に検索します。1 の場合、最上位ウィンドウから下に検索します。
	var objAPI = null;
	intAPISearchOrder=((typeof(intAPISearchOrder)=='undefined')?0:intAPISearchOrder);
	if(intAPISearchOrder==0)
	{
		// 現在のウィンドウから開始し、上位の親のウィンドウ/フレームを再帰的に検索します
		objAPI = findAPI(window);
		if((objAPI==null) && (window.opener != null) && (typeof(window.opener) != "undefined"))
		{
			objAPI = findAPI(window.opener);
		} else if((objAPI==null) && (window.parent != null) && (typeof(window.parent) != "undefined")) {
			objAPI = findAPI(window.parent);
		} else if ((objAPI==null) && (window.parent != null) && (window.parent.opener != null) && (typeof(window.parent.opener) != "undefined")) {
			objAPI = findAPI(window.parent.opener);
		}
	} else {
		// 最上位のウィンドウから開始し、下位の子フレームを再帰的に検索します
		objAPI = findAPI(this.top);
		if (objAPI == null)
		{
			// 現在のウィンドウ階層内に API が見つかりませんでした。
			// 現在のウィンドウが別のウィンドウによって開かれた場合、
			// 元のウィンドウのウィンドウ階層を確認します。
			objTopWindow=window.top;
			objTopWindow = objTopWindow.opener;
			while (objTopWindow && !objAPI)
			{
				// ウィンドウを開いたウィンドウを確認しています
				objAPI = findAPI(objTopWindow.top);
				if (objAPI==null) objTopWindow = objTopWindow.opener;
			}
		}
	}
	if(objAPI==null)
	{
		// API が見つかりません
	} else if(objAPI != null && g_strAPIVersion == -1) {
		g_strAPIVersion = objAPI.version;
	}
	return objAPI;
}
function waitForAPI()
{
	//alert("waitForAPI");
	if(new Date().getTime() > (g_intCurrentTime + g_intIntervalSecs*1000) || APIOK())
	{
		// タイムアウトになったか、API が見つかりました
		clearInterval(g_varInterval);
		if(!APIOK())
		{
			g_objAPI = null;
		} else {
			if (g_bInitializeOnLoad) {
				SCOInitialize();
			}
		}
	} else {
		// API オブジェクトの検索(下から上へ検索)
		g_objAPI = getAPI(0);
		// APIが見つからない場合
		if(g_objAPI==null) {
			// API オブジェクトの検索(上から下へ検索)
			g_objAPI = getAPI(1);
		}
	}
}
function APIOK() {
	return ((typeof(g_objAPI)!= "undefined") && (g_objAPI != null));
}
function SCOInitialize() {
	//alert("SCOInitialize");

	var err = true;
	if (!g_bInitDone) {
		if (!APIOK()) {
			AlertUserOfAPIError(g_strAPINotFound);
			err = false;
		} else {
			err = g_objAPI.Initialize("");
			if (err == "true") {
				g_bSCOBrowse = (g_objAPI.GetValue("cmi.mode") == "browse");
				if (!g_bSCOBrowse) {
					if (g_objAPI.GetValue("cmi.completion_status") == "not attempted" ||
                        g_objAPI.GetValue("cmi.completion_status") == "not_attempted" ||
                        g_objAPI.GetValue("cmi.completion_status") == "unknown") {
						err = g_objAPI.SetValue("cmi.completion_status","incomplete");
                        err = g_objAPI.SetValue("cmi.success_status","failed");
					}
				}
                try{
                    scormInitilaized();
                }catch(e){
                }

            } else {
				AlertUserOfAPIError(g_strAPIInitFailed);
			}
			//---
			onloadFlg = true;
			//---
		}
		if (typeof(SCOInitData) != "undefined") {
			// SCOInitData 関数を他のスクリプトの SCO で定義できます
			SCOInitData();
		}
		g_dtmInitialized = new Date();
	}
	g_bInitDone = true;
	return (err + ""); // 強制的にストリング型にする
}
function SCOFinish() {
	if ((APIOK()) && (g_bFinishDone == false)) {
		SCOReportSessionTime();
		if (g_bSetCompletedAutomatically){
			SCOSetStatusCompleted();
		}
		if (typeof(SCOSaveData) != "undefined"){
			// SCOSaveData 関数を他のスクリプトの SCO で定義できます
			SCOSaveData();
		}
        SCOCommit();

        g_bFinishDone = (g_objAPI.Terminate("") == "true");
	}
	return (g_bFinishDone + "" ); // 強制的にストリング型にする
}
// API アダプタを直接呼び出すのではなく、これらのキャッチャー関数を呼び出してください
function SCOGetValue(nam)			{return ((APIOK())?g_objAPI.GetValue(nam.toString()):"")}
function SCOCommit()					{return ((APIOK())?g_objAPI.Commit(""):"false")}
function SCOGetLastError()		{return ((APIOK())?g_objAPI.GetLastError():"-1")}
function SCOGetErrorString(n)	{return ((APIOK())?g_objAPI.GetErrorString(n):"No API")}
function SCOGetDiagnostic(p)	{return ((APIOK())?g_objAPI.GetDiagnostic(p):"No API")}
//LMSSetValue は以下の複雑なデータ管理ロジックで
//実行されます
var g_bMinScoreAcquired = false;
var g_bMaxScoreAcquired = false;
// 特別なロジックがここから始まります
function SCOSetValue(nam,val){
	var err = "";
	if (!APIOK()){
			AlertUserOfAPIError(g_strAPISetError + "\n" + nam + "\n" + val);
			err = "false";
	} else if (nam == "cmi.score.raw") err = privReportRawScore(val);
	if (err == ""){
			err = g_objAPI.SetValue(nam,val.toString() + "");
			if (err != "true") return err;
	}
	if (nam == "cmi.score.min"){
		g_bMinScoreAcquired = true;
		g_nSCO_ScoreMin = val;
	}
	else if (nam == "cmi.score.max"){
		g_bMaxScoreAcquired = true;
		g_nSCO_ScoreMax = val;
	}
	return err;
}
function privReportRawScore(nRaw) { // SCOSetValue でのみ呼び出し
	if (isNaN(nRaw)) return "false";
	if (!g_bMinScoreAcquired){
		if (g_objAPI.SetValue("cmi.score.min",g_nSCO_ScoreMin+"")!= "true") return "false";
	}
	if (!g_bMaxScoreAcquired){
		if (g_objAPI.SetValue("cmi.score.max",g_nSCO_ScoreMax+"")!= "true") return "false";
	}
	if (g_objAPI.SetValue("cmi.score.raw", nRaw)!= "true") return "false";
	g_bMinScoreAcquired = false;
	g_bMaxScoreAcquired = false;
	if (!g_bMasteryScoreInitialized){
		var nTemp = SCOGetValue("cmi.scaled_passing_score");
		nTemp = (nTemp <= 0?0:nTemp * 100);
		var nMasteryScore = parseInt(nTemp,10);
		if (!isNaN(nMasteryScore)) g_SCO_MasteryScore = nMasteryScore;
	}
  	if ((g_bInterpretMasteryScore)&&(!isNaN(g_SCO_MasteryScore))){
    	var stat = (nRaw >= g_SCO_MasteryScore? "passed" : "failed");
    	if (SCOSetValue("cmi.success_status",stat) != "true") return "false";
  	}
  	return "true";
}
function MillisecondsToCMIDuration(n) {
//期間をミリ秒から 0000:00:00.00 の形式に変換
	var hms = "";
	var dtm = new Date();	dtm.setTime(n);
	var h = "000" + Math.floor(n / 3600000);
	var m = "0" + dtm.getMinutes();
	var s = "0" + dtm.getSeconds();
	var cs = "0" + Math.round(dtm.getMilliseconds() / 10);
	hms = "PT" + h.substr(h.length-4)+"H"+m.substr(m.length-2)+"M";
	hms += s.substr(s.length-2)+"S";
	return hms;
}
// SCOReportSessionTime はこのスクリプトにより自動的に呼び出されますが、
// いつでも SCO から呼び出すことができます
function SCOReportSessionTime() {
	var dtm = new Date();
	var n = dtm.getTime() - g_dtmInitialized.getTime();
	return SCOSetValue("cmi.session_time",MillisecondsToCMIDuration(n));
}
// SCO のデザイナーでなければ完了済みの定義がわからないため、SCO の別のスクリプトが
// この関数を呼び出して完了済みのステータスを設定することがあります。
// この関数は、SCO が参照モードになっていないことを確認し、"完了済み" であることを示す  
// "処理済" および "失敗" に影響を与えることがないようにします。
function SCOSetStatusCompleted(){
	var stat = SCOGetValue("cmi.completion_status");
	if (SCOGetValue("cmi.lesson_mode") != "browse"){
		if ((stat!="completed") && (stat != "passed") && (stat != "failed")){
			return SCOSetValue("cmi.completion_status","completed");
		}
	} else return "false";
}
// 客観的な管理ロジック
function SCOSetObjectiveData(id, elem, v) {
	var result = "false";
	var i = SCOGetObjectiveIndex(id);
	if (isNaN(i)) {
		i = parseInt(SCOGetValue("cmi.objectives._count"));
		if (isNaN(i)) i = 0;
		if (SCOSetValue("cmi.objectives." + i + ".id", id) == "true"){
			result = SCOSetValue("cmi.objectives." + i + "." + elem, v);
		}
	} else {
		result = SCOSetValue("cmi.objectives." + i + "." + elem, v);
		if (result != "true") {
			// この LMS はジャーナルエントリのみを受け取ります
			i = parseInt(SCOGetValue("cmi.objectives._count"));
			if (!isNaN(i)) {
				if (SCOSetValue("cmi.objectives." + i + ".id", id) == "true"){
					result = SCOSetValue("cmi.objectives." + i + "." + elem, v);
				}
			}
		}
	}
	return result;
}
function SCOGetObjectiveData(id, elem) {
	var i = SCOGetObjectiveIndex(id);
	if (!isNaN(i)) {
		return SCOGetValue("cmi.objectives." + i + "."+elem);
	}
	return "";
}
function SCOGetObjectiveIndex(id){
	var i = -1;
	var nCount = parseInt(SCOGetValue("cmi.objectives._count"));
	if (!isNaN(nCount)) {
		for (i = nCount-1; i >= 0; i--){ // LMS がジャーナルを実行する場合に備えて戻る
			if (SCOGetValue("cmi.objectives." + i + ".id") == id) {
				return i;
			}
		}
	}
	return NaN;
}
// AICC と互換性のあるトークンや略語を SCORM のトークンに変換するための関数
function AICCTokenToSCORMToken(strList,strTest){
	var a = strList.split(",");
	var c = strTest.substr(0,1).toLowerCase();
	for (i=0;i<a.length;i++){
			if (c == a[i].substr(0,1)) return a[i];
	}
	return strTest;
}
function normalizeStatus(status){
	return AICCTokenToSCORMToken("completed,incomplete,not attempted,failed,passed", status);
}
function normalizeInteractionType(theType){
	return AICCTokenToSCORMToken("true-false,choice,fill-in,matching,performance,sequencing,likert,numeric", theType);
}
function normalizeInteractionResult(result){
	var strInteractionResult = AICCTokenToSCORMToken("correct,wrong,unanticipated,neutral", result);
	strInteractionResult = (strInteractionResult=="wrong"?"incorrect":strInteractionResult);
	return strInteractionResult;
}
function checkInteractionResponse(response_str)
{
	var result_str = "";
	for(var char_int=0;char_int<response_str.length;char_int++)
	{
		if(response_str.substr(char_int,1) == "." || response_str.substr(char_int,1) == ",")
		{
			if(response_str.substr(char_int - 1,1) != "[" && response_str.substr(char_int + 1,1) != "]")
			{
				result_str += "[" + response_str.substr(char_int,1) + "]";
			} else {
				result_str += response_str.substr(char_int,1);
			}
		} else {
			result_str += response_str.substr(char_int,1);
		}
	}
	result_str = (result_str==""?"0":result_str);
	return result_str;
}
function formatTimestamp(time_var)
{
	return formatDate() + "T" + formatTime(time_var, undefined, undefined, 2);
}
// ******************************************************************
// *
// *     Method:           formatTime
// *     説明 :                パラメータとして渡された秒数を PTxHyMzS に
// *                       フォーマットします
// *     戻り値 :         ストリング (HHHH:MM:SS 形式の時間)
// *
// ******************************************************************
function formatTime(time_var, minutes_str, seconds_str, typeFormat_int)
{
	var days_str, hours_str, formattedTime_str;
	days_str = "0";
	if(time_var == undefined)
	{
		// 現在の時間を基に時間を作成する
		var time_obj = new Date();
		hours_str = time_obj.getHours();
		minutes_str = time_obj.getMinutes();
		seconds_str = time_obj.getSeconds();
	} else if(typeof(time_var) == "string" && time_var.indexOf(":") > -1) {
		var time_obj = time_var.split(":");
		hours_str = time_obj[0];
		minutes_str = time_obj[1];
		seconds_str = time_obj[2];
	} else {
		days_str    = "0";
		seconds_str = "0";
		minutes_str = "0";
		hours_str     = "0";
		seconds_str = Math.round(time_var);
		if(seconds_str > 59)
		{
			minutes_str = Math.round(seconds_str / 60);
			seconds_str = seconds_str - (minutes_str * 60);
		}
		if(minutes_str > 59)
		{
			hours_str = Math.round(minutes_str / 60);
			minutes_str = minutes_str - (hours_str * 60);
		}
		if(hours_str > 23)
		{
			days_str = Math.round(hours_str / 24);
			hours_str = hours_str - (days_str * 24);
		}
	}
	if(typeFormat_int == undefined || typeFormat_int == 1)
	{
		formattedTime_str = "P";
		if(days_str != "0")
		{
			formattedTime_str += days_str + "D";
		}
		formattedTime_str += "T" + hours_str + "H" + minutes_str + "M" + seconds_str + "S";
	} else {
		formattedTime_str = formatNum(hours_str, 2) + ":" + formatNum(minutes_str, 2) + ":" + formatNum(seconds_str, 2);
	}
	return formattedTime_str;
}
// ******************************************************************
// *
// *     Method:           formatDate
// *     説明 :              秒数または "MM/DD/YYYY" をフォーマットします
// *     戻り値 :           ストリング ("YYYY-MM-DD" 形式の日付)
// *
// ******************************************************************
function formatDate(date_var, day_str, year_str)
{
	if (date_var == undefined) {
		// 現在の日付を基に日付を作成する
		var date_obj = new Date();
		date_var = formatNum((date_obj.getMonth()+1), 2);
		day_str  = formatNum((date_obj.getDate()), 2);
		year_str = (date_obj.getFullYear());
	} else if(typeof(date_var) == "string" && date_var.indexOf("/") > -1) {
		// MM/DD/YYYY から変換する
		var date_obj = date_var.split("/");
		date_var = formatNum(date_obj[0], 2);
		day_str  = formatNum(date_obj[1], 2);
		year_str = formatNum(date_obj[2], 4);
	}
	var formattedDate_str = (year_str + "-" + date_var + "-" + day_str);
	return formattedDate_str;
}
// ******************************************************************
// *
// *    Method:         formatNum
// *    説明 :             この関数に渡された数値を、一般的に 2 桁または 4 桁の
// *                         桁揃えされた数値に変換します (たとえば 2 は 02、
// *                         または 0002 に変換されます)
// *   戻り値 :           ストリング (渡された 0 の数で桁揃えされます
// *
// ******************************************************************
function formatNum (initialValue_var, numToPad_int)
{
	var paddedValue_str = "";                         // ストリング。0 で桁揃えされた値が含まれます
	var i = 0;                                     // 整数。ループで使用される変数です
	var initialValue_str = initialValue_var.toString();    // ストリング。パラメータ "initializeValue_var" を明示的にストリングに変換します
	if (initialValue_str.length > numToPad_int)
	{
		// エラー - 初期値の長さが既に桁揃えの数を超えています
		// 追加の桁揃えを行わずに initialValue_var を返します
	} else {
		for (var i = 1; i <= (numToPad_int - initialValue_str.length); i++)
		{
			paddedValue_str = paddedValue_str + "0";
		}
	}
	paddedValue_str = paddedValue_str + initialValue_var;
	return paddedValue_str;
}
// Internet Explorer を検出
var g_bIsInternetExplorer = navigator.appName.indexOf("Microsoft") != -1;
// 必要に応じて、Flash ムービーからの fscommand メッセージを処理し、
// AICC Flash テンプレートコマンドを SCORM に再度マッピングします。
//function THiNQplayer_DoFSCommand(command, args){
function scormCommand(command, args){
	
	//var THiNQplayerObj = g_bIsInternetExplorer ? THiNQplayer : document.THiNQplayer;
	/// 使用可能な SCORM API がない場合には、処理しない
	var myArgs = new String(args);
	var cmd = new String(command);
	var v = "";
	var err = "true";
	var arg1, arg2, n, s, i;
	var sep = myArgs.indexOf(",");
	if (sep > -1){
		arg1 = myArgs.substr(0, sep); // API から取得するデータエレメント名
		arg2 = myArgs.substr(sep+1); 	// 設定する Flash ムービー変数名
	} else {
		arg1 = myArgs;
	}
	if (!APIOK()) return;
	if (cmd.substring(0,3) == "LMS"){
		// "LMSxxx" FScommands (fsSCORM html テンプレートとの互換性あり) を処理
		if ( cmd == "LMSInitialize" ){
			err = (APIOK() + "");
			// 実際の LMSInitialize がテンプレートにより自動的に呼び出されます
		}	else if ( cmd == "LMSSetValue" ){
			//alert('LMSSetValue: \r\rArg1: ' + arg1 + '\rArg2: ' + arg2);
			err = SCOSetValue(arg1,arg2);
		} else if ( cmd == "LMSFinish" ){
			err = SCOFinish();
			// テンプレートによる自動処理になっていますが、
			// それ以前にムービーが呼び出すことがあります。
		}	else if ( cmd == "LMSCommit" ){
			err = SCOCommit();
		}	else if ( cmd == "LMSFlush" ){
			// 操作不能
			// SCORM では定義されていないため、LMSFlush を呼び出すとテストスイートにエラーが生じます。
		//}	else if ((arg2) && (arg2.length > 0)){
		}	else if ( cmd == "LMSGetValue") {
				//alert('LMSSetValue: \r\rArg1: ' + arg1 + '\rArg2: ' + arg2);
				//THiNQplayerObj.SetVariable(arg2, SCOGetValue(arg1));
				err = SCOGetValue(arg1);
			}	else if ( cmd == "LMSGetLastError") {
				//THiNQplayerObj.SetVariable(arg2, SCOGetLastError(arg1));
				err = SCOGetLastError(arg1);
			}	else if ( cmd == "LMSGetErrorString") {
				//THiNQplayerObj.SetVariable(arg2, SCOGetLastError(arg1));
				err = SCOGetLastError(arg1);
			}	else if ( cmd == "LMSGetDiagnostic") {
				//THiNQplayerObj.SetVariable(arg2, SCOGetDiagnostic(arg1));
				err = SCOGetDiagnostic(arg1);
			}	else {
				// 不明な LMSGetxxxx 拡張機能
				v = eval('g_objAPI.' + cmd + '(\"' + arg1 + '\")');
				//THiNQplayerObj.SetVariable(arg2,v);
				err = v;
			}
		//} else if (cmd.substring(0,3) == "LMSGet") {
		//	err = "-2: No Flash variable specified";
		//}
		// "LMSxxx" コマンドの処理の終わり
	} else if ((cmd.substring(0,6) == "MM_cmi")||(cmd.substring(0,6) == "CMISet")) {
		// Macromedia 学習コンポーネントの FScommands を処理します。
		// これらは AICC HACP データモデル規則を使用しているため、
		// 必要に応じて再度データを AICC から SCORM へマップしてください。
		var F_intData = myArgs.split(";");
		if (cmd == "MM_cmiSendInteractionInfo") {
			n = SCOGetValue("cmi.interactions._count");
			s = "cmi.interactions." + n + ".";
			// SCORM 準拠テストに不適合とならないよう、大きいエラーをキャッチします。
			// このインタラクションに ID が提供されない場合は、記録することができません
			v = F_intData[2];
			if ((v == null) || (v == "")) err = 201; // ID がない場合は、記録する意味がありません
			if (err =="true"){
				err = SCOSetValue(s + "id", v);
			}
			if (err =="true"){
				var re = new RegExp("[{}]","g");
				for (i=1; (i<9) && (err=="true"); i++){
					v = F_intData[i];
					if ((v == null) || (v == "")) continue;
					if (i == 1){
						err = SCOSetValue(s + "timestamp", formatTimestamp(v));
					} else if (i == 3){
						err = SCOSetValue(s + "objectives.0.id", v);
					} else if (i == 4){
						err = SCOSetValue(s + "type", normalizeInteractionType(v));
					} else if (i == 5){
						// strip out "{" and "}" from response
						v = v.replace(re, "");
						err = SCOSetValue(s + "correct_responses.0.pattern", checkInteractionResponse(v));
					} else if (i == 6){
						// strip out "{" and "}" from response
						v = v.replace(re, "");
						err = SCOSetValue(s + "learner_response", checkInteractionResponse(v));
					} else if (i == 7){
						err = SCOSetValue(s + "result", normalizeInteractionResult(v));
					} else if (i == 8){
						err = SCOSetValue(s + "weighting", v);
					} else if (i == 9){
						err = SCOSetValue(s + "latency", v);
					}
				}
			}
		} else if (cmd == "MM_cmiSendObjectiveInfo"){
			err = SCOSetObjectiveData(F_intData[1], ".score.raw", F_intData[2]);
			if (err=="true"){
				SCOSetObjectiveData(F_intData[1], ".status", normalizeStatus(F_intData[3]));
			}
		} else if ((cmd=="CMISetScore") ||(cmd=="MM_cmiSendScore")){
			err = SCOSetValue("cmi.score.raw", F_intData[0]);
		} else if ((cmd=="CMISetStatus") || (cmd=="MM_cmiSetLessonStatus")){
			var strTempStatus = normalizeStatus(F_intData[0]);
			if (strTempStatus == "passed" || strTempStatus == "failed")
			{
				err = SCOSetValue("cmi.success_status", normalizeStatus(F_intData[0]));
			} else {
				err = SCOSetValue("cmi.completion_status", normalizeStatus(F_intData[0]));
			}
		} else if (cmd=="CMISetTime"){
			err = SCOSetValue("cmi.session_time", formatTime(F_intData[0]));
		} else if (cmd=="CMISetCompleted"){
			err = SCOSetStatusCompleted();
		} else if (cmd=="CMISetStarted"){
			err = SCOSetValue("cmi.completion_status", "incomplete");
		} else if (cmd=="CMISetPassed"){
			SCOSetValue("cmi.completion_status", "completed");
			err = SCOSetValue("cmi.success_status", "passed");
		} else if (cmd=="CMISetFailed"){
			SCOSetValue("cmi.completion_status", "completed");
			err = SCOSetValue("cmi.success_status", "failed");
		} else if (cmd=="CMISetData"){
			err = SCOSetValue("cmi.suspend_data", F_intData[0]);
		} else if (cmd=="CMISetLocation"){
			err = SCOSetValue("cmi.location", F_intData[0]);
		} else if (cmd=="CMISetTimedOut"){
			err = SCOSetValue("cmi.exit", "time-out");
		} // その他の学習コンポーネントの FScommands はこのコンテキストでは操作不能です
	} else {
		if (cmd=="CMIFinish" || cmd=="CMIExitAU"){
			err = SCOFinish();
		} else if (cmd=="CMIInitialize" || cmd=="MM_StartSession"){
			err = SCOInitialize();
		} else {
			// 不明のコマンド; API 拡張を呼び出す可能性あり
			// コマンドが 2 つ目の引数を伴っている場合は、期待する値を仮定しておきます。
			// それ以外の場合は、ただの cmd とみなしてください
				if (eval('g_objAPI.' + cmd)) {
				v = eval('g_objAPI.' + cmd + '(\"' + arg1 + '\")');
				if ((arg2) && (arg2.length > 0)){
					//THiNQplayerObj.SetVariable(arg2,v);
					err = v;
				} else {
					err = v;
				}
			} else {
				err = "false";
			}
		}
	}
	// コマンドの変換と処理の終了
	// 検出されたエラー (LMS エラーの戻り値など) が処理されます
	if ((g_bShowApiErrors) && (err != "true")) {
		AlertUserOfAPIError(ExpandString(g_strFSAPIError, err, cmd, args));
	}
	return err
}

// 残りの HTML ページのロードが完了する前に一部の ActionScript が実行される場合、
// ムービーのロード前に API を初期化するかどうかを判断します。
// これは、グローバルブール値 (g_bInitializeOnLoad) を
// このファイルの最初に設定することにより設定できます。
// デフォルト値は true です。
// SCORM API を検索します
//g_varInterval = setInterval('waitForAPI()', (g_intPollSecs * 1000));

var scoFinish = false;
//SCO完了メソッド
function myFinish(){
  if(scoFinish == false){
	 scoFinish = true;
      try{
          scormPreFinish();
      }catch(e){
      }
      SCOFinish();
  }
}

/*
window.addEventListener('unload', myFinish, false);
window.addEventListener('beforeunload', myFinish, false);
*/

//addEventListenerFunc('load', function(){SCOInitialize();});
addEventListenerFunc('unload', myFinish);
addEventListenerFunc('beforeunload', myFinish);

function addEventListenerFunc(eventType, f){
    if (window.addEventListener) { //for W3C DOM
        window.addEventListener(eventType, f, false);
    } else if (window.attachEvent) { //for IE
        window.attachEvent("on" + eventType, f);
    } else {
        window["on" + eventType] = f;
    }
}

function scoInitializeFromScormManager(){
    g_varInterval = setInterval('waitForAPI()', (g_intPollSecs * 1000));
}

<script>
	import { isAndroid, isIOS } from "tns-core-modules/platform";
	import { CalcModel } from './CalcModel';
	import Keypad from './Keypad.svelte';

	var page  = null;
	var label = null;

	let value = "0";
	$: view = value;

	let FN_NOP      = "nop";
	let FN_ALLCLEAR = "AC";
	let FN_SIGN     = "+/-";
  let FN_MODULO   = "%";
  let FN_DIVIDE   = "/";
  let FN_TIMES    = "x";
  let FN_MINUS    = "-";
	let FN_PLUS     = "+";

	let calculator = new CalcModel();


	function UpdateDisplay(val) {
		value = val;
	}

  function onTapSign() {
		let accumulator = calculator.GetAccumulator(value);

		if (accumulator == "0") {
				; // do nothing
		} else if (accumulator == "0.0") {
				; // do nothing
		} else if (accumulator.startsWith("-")) {
				accumulator = accumulator.substring(1);
		} else {
				accumulator = "-" + accumulator;
		}
		UpdateDisplay(accumulator);
	}

	function onDigit(digit) {
		let accumulator = (calculator.IsResult() ? "" : calculator.GetAccumulator(value));
		calculator.SetResultFalse();

		if (accumulator == "0") {
			accumulator = "" + digit;
		} else {
			accumulator = ("" + accumulator) + digit;
		}
		UpdateDisplay(accumulator);
	}
	
	function onDecimal() {
		let accumulator = (calculator.IsResult() ? "0" : calculator.GetAccumulator(value));
		calculator.SetResultFalse();

		if (accumulator.indexOf(".") == -1) {
				accumulator = ("" + accumulator) + ".";
		}
		UpdateDisplay(accumulator);
	}
		
	function onEquals() {
  	let accumulator = calculator.GetAccumulator(value);
  	calculator.CalculateResult(accumulator);
  	calculator.SetResultTrue();

		let status = calculator.GetStatus();

		if (status != "") {
			UpdateDisplay("0");
			calculator.SetStatus("");
			alert(`${status}`);
		}
		else {
			UpdateDisplay(calculator.GetResult());
		}
	}

	function handleKeypress(event) {
		if (event.detail.text == FN_ALLCLEAR) {
			calculator.ClearAll();
			value = "0";
		}
		else if (event.detail.text == FN_SIGN) {
			onTapSign();
		}
		else if (event.detail.text == FN_MODULO) {
			calculator.StoreResult(value);
			calculator.OnModulo();
		}
		else if (event.detail.text == FN_DIVIDE) {
			calculator.StoreResult(value);
			calculator.OnDivide();
		}
		else if (event.detail.text == FN_TIMES) {
			calculator.StoreResult(value);
			calculator.OnTimes();
		}
		else if (event.detail.text == FN_MINUS) {
			calculator.StoreResult(value);
			calculator.OnMinus();
		}
		else if (event.detail.text == FN_PLUS) {
			calculator.StoreResult(value);
			calculator.OnPlus();
		}
		else if (event.detail.text == "0") {
			onDigit("0");
		}
		else if (event.detail.text == "1") {
			onDigit("1");
		}
		else if (event.detail.text == "2") {
			onDigit("2");
		}
		else if (event.detail.text == "3") {
			onDigit("3");
		}
		else if (event.detail.text == "4") {
			onDigit("4");
		}
		else if (event.detail.text == "5") {
			onDigit("5");
		}
		else if (event.detail.text == "6") {
			onDigit("6");
		}
		else if (event.detail.text == "7") {
			onDigit("7");
		}
		else if (event.detail.text == "8") {
			onDigit("8");
		}
		else if (event.detail.text == "9") {
			onDigit("9");
		}
		else if (event.detail.text == ".") {
			onDecimal();
		}
		else if (event.detail.text == "=") {
			onEquals();
		}

		//console.log("handleKeypress is '" + event.detail.text + "'");
	}

	function handleCopy() {
		alert("hello")
	}

	// Add to label tag:  on:longpress={handleCopyPaste}
	function handleCopyPaste(args) {
		//console.log("handleCopyPaste called");

		//console.log(args.ios);
		//console.log(label.ios.becomeFirstResponder());
		if (args.ios.state !== 3)
      return;
		
		console.log("handleCopyPaste menu called");

		var menu = UIMenuController.sharedMenuController;
		label.ios.becomeFirstResponder();
		var copyItem = new UIMenuItem({title: "Copy", action: "handleCopy"})
		menu.menuItems = [copyItem]
		menu.setMenuVisibleAnimated(false, false);
		menu.setTargetRectInView(args.ios.view.frame, args.ios.view.superview);
		menu.setMenuVisibleAnimated(true, true);
		menu.update();

		//console.log(menu);
	}

	export function onPageLoaded(args) {
    page = args.object;
		
		label = page.getViewById('display-label');

		if(isIOS) {
			// On iOS, there is support for autosizing the font so text fits the display
			label.ios.adjustsFontSizeToFitWidth = true;
			label.ios.isUserInteractionEnabled = true;
		} else if (isAndroid) {
			// https://developer.android.com/guide/topics/ui/look-and-feel/autosizing-textview
			label.android.autoSizeTextType = "uniform";
		}
	}
</script>

<page xmlns="tns" class="page" on:loaded={onPageLoaded}>
	<actionBar></actionBar>
  <stackLayout orientation="vertical">
		<label id="display-label" class="display-label" text="{view}" />
		<Keypad on:keypress={handleKeypress}/>
	</stackLayout>
</page>
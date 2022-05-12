const obj = embed_reader.getOBJ(READER_TYPE._reader_type_compro);
obj.onResult(function (rData) {
  switch (rData.FunctionID) {
    case FUNCIDS._fid_adaptReader: {
      // alert("Server is ready, you can start now!");
      console.log("Server is ready, you can start now!");
      Connect();
      break;
    }
    case FUNCIDS._fid_initialcom: {
      var opst;
      var rel = rData.RePara_Int;
      if (0 == rel) {
        var hdev = parseInt(rData.RePara_Str);
        if (hdev != -1) {
          if (1 === gl_linkTimerOpened) clearInterval(gl_linkInterval);
          icdev = hdev;

          if (isComOpen == true) break;
          isComOpen = true; //Set reader link status
          gl_fFailedShow = 0; //reset the flag whether show fail message or not

          // msg.value = msg.value + "Link reader ok\n";
          console.log("Link reader ok");

          Findcard();
        } else {
          if (0 == gl_fFailedShow) {
            gl_fFailedShow = 1; //set the flag whether show fail message or not
            // msg.value = "Link reader error\n";
            console.log("Link reader error");
          }
          //isComOpen=false;           //Set reader link failed status
          if (0 == gl_linkTimerOpened) {
            gl_linkInterval = setInterval(Connect, 3000);
            gl_linkTimerOpened = 1; //Set flag
          }
        }
      } else {
        // msg.value = "Object load error\n";
        console.log("Object load error");
      }
      break;
    }
    case FUNCIDS._fid_exit: {
      // msg.value = msg.value + "reader closed\n";
      console.log("reader closed");
      break;
    }
    case FUNCIDS._fid_beep: {
      Findcard();
      break;
    }
    case FUNCIDS._fid_halt: {
      obj.beep(icdev, 10);
      break;
    }
    case FUNCIDS._fid_findCardStr: {
      var strcard = rData.RePara_Str;
      if (strcard != "") {
        hasCard = true;
        // msg.value = msg.value + "Card ID: " + strcard + "\n";
        // console.log("Card ID: " + strcard);
        window.dispatchEvent(new CustomEvent("card-ok", { detail: strcard }));
        obj.halt(icdev);
      } else {
        if (0 == gl_fFailedShow) {
          gl_fFailedShow = 1; //set the flag whether show fail message or not
          // msg.value = msg.value + "Found no card, put a card on the RF area now\n";
          console.log("Found no card, put a card on the RF area now");
        }

        hasCard = false; //Set no card status
        Findcard();
      }
      break;
    }
  }
});

//Link Reader
function Connect() {
  try {
    if (isComOpen == false) {
      //if reader link failed
      //alert("initialcom");
      obj.initialcom(100, 115200);
    }
  } catch (e) {
    console.log(e.message);
  }

  return;
}

// Find card
function Findcard() {
  obj.findcardStr(icdev, 0); //1);     //1: multy card mode
  gl_wantFunc = 0;
}

//Disconnect with reader
function Disconnect() {
  iRet = obj.exit(icdev);
  isComOpen = false; //Set unlink status
}

var GFUNC = {
  readClass: 1,
  writeClass: 2,
  initVal: 3,
  increment: 4,
  decrement: 5,
  readVal: 6,
  updateKey: 7,
  mifareProTest: 8,
};

var nRead = 0; //The count one card repeat find
var hasCard = false;
var isComOpen = false;
var icdev = -1;
var gl_sector = 2;
var gl_BinBlock = 8;
var gl_valBlock = 9;
var gl_romRWLen = 10;
var gl_romRWAddr = 0;
var gl_wantFunc = 0;
var gl_fFailedShow = 0;
var gl_linkTimerOpened = 0;
var gl_linkInterval;

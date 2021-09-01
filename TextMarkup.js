function TextMarkup(content, elementattr={}){
    elementattr = 
    {h2:"",h3:"",strong:"",em:"",u:"",mark:"",q:"",...elementattr};
    Context = this;
    let body = DOMHelp._("body");
    let markupboard = this.board = 
    document.createElement("TM-markupboard-wrapper");
    body.append(markupboard);
    markupboard.innerHTML = 
    "<div id='TM-buttonsboard'><div id=\"TM-scrollpageX1\">"
        +"<button data-mark='formatBlock:<h2 "+elementattr.h2+">:</h2><p>' >To Major Heading </button>"
        +"<button data-mark='formatBlock:<h3 "+elementattr.h3+">:</h3><p> ' >To Sub-heading </button>"
        +"<button data-mark='formatBlock:<strong "+elementattr.strong+">:</strong>' id='toB'> Bold</button>"
        +"<button data-mark='formatBlock:<em "+elementattr.em+">:</em>' >Italizied </button>"
        +"<button data-mark='formatBlock:<u "+elementattr.u+">:</u>' >     Underline</button>"
        +"<button data-mark='formatBlock:<mark "+elementattr.mark+">:</mark>' >           Highlight</button>"
        +"<button data-mark='formatBlock:<q "+elementattr.q+" cite=\":\"></q>' >Quote</button>"
        +"<button id='TM-undo-but'>Undo Action</button>"
        +"<button id='TM-hideboard-but'>Hide Board</button>"
        +"<button id='TM-clearall-but'>Clear All</button>"
    +"</div>"
    +"<div id=\"TM-scrollpageX2\">"
        +"<button data-mark='formatBlock:<ul blogul><li>:</li></ul>'  type=\"createspace\">Create List</button>"
        +"<button data-mark=\"formatBlock:<img blogimg class='blogims' src='img/defaultimlast.png' alt=':'></img>\" >Upload Image        </button>"
    +"</div>"
    
    
    
   DOMHelp._("#TM-buttonsboard").style = "border-radius: 10px; background: inherit;    width: 100%;    display: block;    text-align: center;    padding: 5px; box-sizing: border-box;    color: white; font-family: font6;    -webkit-box-shadow: 1px 1px 5px -1px grey;     -moz-box-shadow: 1px 1px 5px -1px grey;     box-shadow: 1px 1px 5px -1px grey;    white-space: nowrap;    overflow-x: scroll;  overflow-y: none;  "
       +"position: fixed; top: 0; background-color: #aabbdd;";
   DOMHelp._("#TM-scrollpageX1").style ="width: 100%;     display: inline-block;    white-space: normal; "
   DOMHelp._("#TM-scrollpageX2").style = "width: 100%;     display: inline-block;    white-space: normal;"; 
   [...document.querySelectorAll("#TM-buttonsboard button[data-mark]")]
   .map((but)=>{
       but.style="background: rgb(22, 19, 55); border-color: transparent;    color: white; font-family: courier;     box-shadow: 1px 1px 5px -1px black; display: inline; margin: 1px;";
   });
   
   
   
   
   
   
   
   
   
   
   
content.setAttribute("contenteditable",true);
markupboard.style.display = "none"
content.onfocus = ()=>{markupboard.style.display = "inline";}
//content.onblur = ()=>{ markupboard.style.display = "none";};
   
   
   
   
   
//controls
DOMHelp._("#TM-hideboard-but").onclick = function () {
    markupboard.style.display = "none";
}
DOMHelp._("#TM-undo-but").onclick = function () {
    Undo();
}
DOMHelp._("#TM-clearall-but").onclick = function () {
    ClearAll();
    content.focus();
}
content.addEventListener("paste", function (e) {
    var clipboardData = e.clipboardData; 
    var cboardText = clipboardData.getData("text/plain");
    e.preventDefault();
    document.execCommand("insertText", false, cboardText);
});
    
[...document.querySelectorAll("#TM-buttonsboard button[data-mark]") ]
.map( function(btn){
    btn.addEventListener("click",function(event){  mark(btn, event); } ); 
});






var markactions = [{result: content.innerHTML}];
var undoCount = 0;
function mark(el, event){ 
 event.preventDefault();
 var attr_val = el.getAttribute("data-mark").split(":");
 var highlighted = document.getSelection();
 
 //ReplaceTagToText
 ReplaceTagToText(highlighted, attr_val[1], attr_val[2]); 
 
 //ReplaceTextToTag;
 content.innerHTML = content.innerHTML
 .replace( (new RegExp(":LT:", 'g')), "<")
 .replace( (new RegExp(":GT:", 'g')), ">");
 
 Context.html = content.innerHTML;
 markactions.push({result: content.innerHTML});
 undoCount = markactions.length-1;
 //add listeners to image  
 //setImagesByClass("blogims");
}//EO mark



function ReplaceTagToText(highlighted, startTag, closeTag){ 
 var hText = highlighted.toString();
 var hlStartNode = highlighted.anchorNode;
 var hlEndNode = highlighted.focusNode;    
 var hlStartPosition = highlighted.anchorOffset;    
 var hlEndPosition = highlighted.focusOffset; 
 
 startTag = startTag
 .replace( (new RegExp("<", 'g')), ":LT:")
 .replace( (new RegExp(">", 'g')), ":GT:");
 closeTag = closeTag
 .replace( (new RegExp("<", 'g')), ":LT:")
 .replace( (new RegExp(">", 'g')), ":GT:");
 
 function InsertAt(a,b,pos){return[a.slice(0,pos),b,a.slice(pos)].join(''); }
 highlighted.focusNode.data=InsertAt(hlEndNode.data,closeTag, hlEndPosition);
 highlighted.anchorNode.data=InsertAt(hlStartNode.data,startTag, hlStartPosition);
}//EO repler
   
   
function Undo(){
    if(undoCount>=1)content.innerHTML = markactions[--undoCount].result;
}   
    
    
function ClearAll(){
    content.innerHTML = "";
    Context.html = content.innerHTML;
    markactions.push({result: content.innerHTML});
    undoCount = markactions.length-1;
}   
    
    
    
    
   
   
}//EO TextMarkUp
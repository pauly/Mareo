type imageElement;

type canvasRenderingContext2D;

type canvasElement;

external document : Dom.document = "" [@@bs.val];

external window : Dom.window = "" [@@bs.val];

/* external createImg: (_ [@bs.as "img"]) -> document -> imageElement = "createElement" [@@bs.send] */
external createImg : Dom.document => _ [@bs.as "img"] => imageElement =
  "createElement" [@@bs.send];

external requestAnimationFrame : (float => unit) => unit = "" [@@bs.val];

external getElementById : Dom.document => string => option Dom.element =
  "" [@@bs.return null_to_opt] [@@bs.send];

external addEventListener :
  Dom.document => string => (Dom.event_like 'a => Js.boolean) => Js.boolean => unit =
  "" [@@bs.send];

external addEventListenerImg :
  imageElement => string => (Dom.event_like 'a => Js.boolean) => Js.boolean => unit =
  "addEventListener" [@@bs.send];

/* unsafe casts */
external imageElementToJsObj : imageElement => Js.t {..} = "%identity";

external canvasRenderingContext2DToJsObj : canvasRenderingContext2D => Js.t {..} = "%identity";

external canvasElementToJsObj : canvasElement => Js.t {..} = "%identity";

external keyboardEventToJsObj : Dom.keyboardEvent => Js.t {..} = "%identity";

external elementToCanvasElement : Dom.element => canvasElement = "%identity";

external windowToJsObj : Dom.window => Js.t {..} = "%identity";

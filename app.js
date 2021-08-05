const SIDEBAR_WIDTH= "sidebarWidth";
/**
 * transform element into a resizer handler
 *  
 * @param {htmlElement} element
 * @param {function} cb Callback called on resize with the offsetX parameter
**/
function resizer(element, cb) {
    element.addEventListener("pointerdown", onPointerDown);

    /**
         * @param {PointerEvent} e 
    */
     function onPointerDown(e) {
        e.preventDefault();
        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp, { once: true });
      }
        /**
         * @param {PointerEvent} e 
        */
     function onPointerUp(e) {
        document.removeEventListener("pointermove", onPointerMove);
      }
        /**
         * @param {PointerEvent} e 
        */
    function onPointerMove(e) {
        e.preventDefault();
        const sidebarWidth = e.pageX + "px";
        document.body.style.setProperty("--sidebar", sidebarWidth);
  }
    
    
}

resizer(document.querySelector('.resizer'),
 rafThrottle (function (x) {
    const sidebarWidth = x + "px";
    sessionStorage.setItem(SIDEBAR_WIDTH, 'sidebarWidth')
    document.body.style.setProperty("--sidebar", sidebarWidth);
})
);

const sidebarWidth = sessionStorage.getItem(SIDEBAR_WIDTH);
if (sidebarWidth !== null) {
    document.body.style.setProperty("--sidebar", sidebarWidth);
}

function rafThrottle (callback) {
  let requestId = null

  let lastArgs

  const later = (context) => () => {
    requestId = null
    callback.apply(context, lastArgs)
  }

  const throttled = function(...args) {
    lastArgs = args;
    if (requestId === null) {
      requestId = requestAnimationFrame(later(this))
    }
  }

  throttled.cancel = () => {
    cancelAnimationFrame(requestId)
    requestId = null
  }

  return throttled
}

export default rafThrottle
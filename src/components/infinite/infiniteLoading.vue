<template>
  <div class="infinte">
    <div>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
  </div>
</template>
<script>
  /**
   * get the first scroll parent of an element
   * @param  {DOM} elm    the element which find scorll parent
   * @return {DOM}        the first scroll parent
   */
  function getScrollParent(elm) {
    if (elm.tagName === 'BODY') {
      return window;
    } else if (['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
      return elm;
    }
    return getScrollParent(elm.parentNode);
  }

  /**
   * get current distance from footer
   * @param  {DOM} elm    scroll element
   * @return {Number}     distance
   */
  function getCurrentDistance(elm) {
    const innerHeight = elm === window
                      ? window.innerHeight
                      : parseInt(getComputedStyle(elm).height, 10);
    const scrollHeight = elm === window
                       ? document.body.scrollHeight
                       : elm.scrollHeight;
    const scrollTop = isNaN(elm.scrollTop) ? elm.pageYOffset : elm.scrollTop;

    return scrollHeight - innerHeight - scrollTop;
  }

  export default {
    data() {
      return {
        isLoading: false,
        scrollParent: null,
        scrollHandler: null,
      };
    },
    props: {
      distance: Number,
      onInfinite: Function,
    },
    ready() {
      if (this.distance === undefined) {
        this.$set('distance', 100);
      }

      this.scrollParent = getScrollParent(this.$el);

      this.scrollHandler = function scrollHandlerOriginal() {
        const currentDistance = getCurrentDistance(this.scrollParent);
        if (!this.isLoading && currentDistance <= this.distance) {
          this.isLoading = true;
          if (this.onInfinite) {
            this.onInfinite.call();
          }
        }
      }.bind(this);

      setTimeout(this.scrollHandler, 1);
      this.scrollParent.addEventListener('scroll', this.scrollHandler);
    },
    events: {
      // Hide the loading icon when data was loaded
      '$InfiniteLoading:loaded'() {
        this.isLoading = false;
      },
    },
    destroyed() {
      this.scrollParent.removeEventListener('scroll', this.scrollHandler);
    },
  };
</script>
<style lang="scss" scoped>
.infinte{
  padding:10px;
  position: relative;
  div{
    position:absolute;
    top:-44px;
    width:100%;
    text-align: center;
    i{
      display: inline-block;
      background-color:#000000;
      width:10px;
      height:10px;
      animation:infinte 1.3s infinite normal;
      -webkit-transform:scale(0);
      border-radius: 50%;
      &:nth-of-type(1) {
         animation-delay: 0.52s;
      }
      &:nth-of-type(2) {
         animation-delay: 0.65s;
      }
      &:nth-of-type(3){
          animation-delay:0.78s;
      }
      &:nth-of-type(4){
         animation-delay:0.91s;
      }
      &:nth-of-type(5){
         animation-delay:1.04s;
      }
    }
  }
}
@keyframes infinte {
  0% {
    transform: scale(1);
    background-color: #000000;
  }
  100% {
    transform: scale(0);
    background-color: #FFFFFF;
  }
}
</style>
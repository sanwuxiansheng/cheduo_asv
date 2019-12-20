export default function input_on() {
  const u = navigator.userAgent;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
    window.addEventListener('resize', function () {
      // Document 对象的activeElement 属性返回文档中当前获得焦点的元素。
      if (document.activeElement.id === 'INPUT') {
        // alert(document.activeElement.getElementsByClassName)
        console.log('安卓触发', document.activeElement.className)
        window.setTimeout(function() {
          document.activeElement.scrollIntoView({
            behavior:'instant',
            block: 'start' 
          });
        }, 50);
      }
    })
  }
}
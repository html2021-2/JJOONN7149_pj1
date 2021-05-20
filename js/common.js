$(document).ready(function () {
  var $header = $('#header');
	var $gnb=$("#gnb > ul");
	$gnb.find(" li ul").hide();	//depth2의 ul 태그는 자동으로 숨기고 시작

	//1)depth1 <a>에 마우스 진입:mouseenter, focus
	$gnb.find("> li > a").on("mouseenter focus",function  () {
		//초기화
		$gnb.find("> li.on").removeClass("on").children("ul").hide();
		//$header.removeClass('active');

		//현재설정
		$(this).parent().has('ul').closest($header).addClass('active');	//#header 너비의 100% 흰색바 생성을 위한 클래스명 추가
		$(this).next().show().parent().addClass("on");
	});

	//2)nav에서 마우스 떠나기:mouseleave
	$gnb.on("mouseleave",function  () {
		$header.removeClass('active');
		$gnb.find("> li.on").removeClass("on").children("ul").hide();
	});

	//3)blur: shift탭을 눌러서 gnb에서 포커스가 나가던지, 탭을 눌러 gnb에서 포커스가 나가던지, 
	$("#gnb a:first , #gnb a:last").on("blur",function  () {
		setTimeout(function  () {
			if ( !$("#gnb a").is(":focus") ) {
				$gnb.mouseleave();
			}1
		}, 10);
	});
  
  /* 패밀리사이트 */
	var $family=$("#footer .family");
	var $btn = $family.find("a").first();		//depth1 a:Family Site라는 텍스트가 담긴 링크
	var $btnSubmit =	$family.find("a").last();		//확인(새창열기 버튼)
	var tgHref;
  
  //1-1) $btn을 클릭해서 ul 태그 열어주기
$btn.on("click",function  (e) {
  e.preventDefault();

  $(this).next().stop().show().parent().addClass('on');

  //1-2) ul 태그에서 마우스가 떠나면 닫아주기
  $(this).next().on("mouseleave",function  () {
    $(this).stop().hide().parent().removeClass('on');
  });

  //1-3) focus가 family 내부에 있지 않을 경우 닫아주기
  $family.find("a:first , a:last").on("blur",function  () {
    setTimeout(function  () {
      if (!$family.find("a").is(":focus")) $family.find(">ul").stop().hide();
    }, 1000);
  });

  //2) ul li a를 클릭하면 자신의 텍스트와 href를 변수에 담아 $btn에 글자를 강제로 바꾼다=> ul 태그 닫아주기
  $family.find(">ul>li>a").on("click",function  (e) {
    e.preventDefault();
    var tgTxt=$(this).text();
    tgHref=$(this).attr("href");
    //console.log(tgTxt, tgHref);

    $btn.text(tgTxt).focus().next().stop().show();
  });
});

//3) 확인버튼 눌러 페이지 이동시키기
$btnSubmit.on("click",function  (e) {
  e.preventDefault();
  if ($btn.text()=="Family Site") return false;

  //window.open("열려질 새창의 경로명","팝업창 이름","옵션");
  window.open(tgHref, "popup");
});
});
function data_declare(name, group, district, desc) {
	this.name = name;
	this.group = group;
	this.district = district;
	this.desc = desc;
}

function push(target, data)
{
	var count = target.length;
	target[count] = data;
	count++;
}

function on_click_place(a)
{
	location.href = "single-listing.html?id=" + a;
}

function type_to_real(a)
{
	for (var i = 0; i < types_real.length; i++)
	{
		if (a == types_real[i])
			return types[i];
	}
	return a;
}

function random_long(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var map_x = 0.0;
var map_y = 0.0;
var map_title = "";
var map_string = "";

var map_target = "";

function initializeMap()
{
	if (!map_target.length)
		return;
	
	var zoomLevel = 16;

	var myLatlng = new google.maps.LatLng(map_y, map_x);
	var mapOptions = {
						zoom: zoomLevel,
						center: myLatlng,
						mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById(map_target), mapOptions);

	var marker = null;
	
	if (map_title.length)
	{
		marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			title: map_title
		});
	}
	else
	{
		marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});
	}
	
	if (marker && map_string.length)
	{
		var markerMaxWidth = 300;
		var infowindow = new google.maps.InfoWindow
		(
			{
				content: map_string,
				maxWidth: markerMaxWidth
			}
		);

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
		});
	}
}

var districts = ["BokJeong dong, SungNam", "TaePyeong dong, SungNam", "GwangJin gu, Seoul", "SongPa gu, Seoul"];
var types = ["Restaurants", "Cafés & Desserts", "Bars", "Healing Places"];
var types_real = ["restaurant", "cafe", "bar", "heal"];

var places = Array();

var description = [
	"It's a restaurant about 10 minutes away from school where the main menu is rice with toppings are the main menu. The average price is about 9000 won, and you can enjoy various kinds of rice, from steak to salmon. Meals are provided in M and L sizes, and the price is 1,000 won to 1500 won. You can eat enough food in size M. In addition to rice with toppings, there are ramen, salmon sashimi, and cold soba. There are side croquette, chicken garaage, and fried king prawns, so you can enjoy various menus.",
	"It is a famous pork cutlet restaurant for Gachon University students about 5 minutes away from school. Pork cutlet is made of spicy pork cutlet, cheese pork cutlet, and raw sirloin pork cutlet. You can enjoy the charm of cheese pork cutlet, pleasantly spicy pork cutlet, and raw pork cutlet that is faithful to the basics. There are delicious naengmyeon in hot summer, cold buckwheat noodles, cold buckwheat noodles, spicy udon, pork cutlet udon, etc. The price ranges from 4,500 won to 8,500 won. Students may have to wait sometimes during lunchtime.",
	"This is the hamburger steak restaurant on the 4th floor of Kyungwon Plaza. It's inside the subway station, so you can get in right away when you get off the subway. There are no other menus except hamburg steak, and there are three menus: original hamburg, spicy hambak, cheongyang carborona, and spicy cheese hamburg. You can also order beer. The price is about 7,500 won. You can order by machine at the entrance to the restaurant. Although there is no other menu, you can taste the hamburg steak that Koreans would like.",
	"It's a snack bar on the 1st floor of Kyungwon Plaza. It is a restaurant that sells various foods such as gimbap, snack, Korean food, and Western food without the main menu. It's very close to school, so it's good to go when you're in a hurry. There are many different kinds of food, but there are many different kinds of menus. I heard that the menu is forming a low price group of less than 8,000 won, and the volume has increased a lot since the president changed recently. It's close, cheap, and you can eat well-to-eat meals.",
	
	"It is a cafe in the building opposite the Morning Glory near Gachon University. You can feel the fresh and spacious atmosphere. It's a good environment to study and there are various desserts and coffee, so your mouth is not boring. Other cafes and French coffee shops offer rare tomato juice and fruit ade, so you can enjoy a different drink. Try the signature menu, coconut milk tea.",
	"It's a cafe in the next building near Morning Glory. There are a variety of comfortable chairs inside, and there are basic drinks and coffee. The price range is about 4,500 won on average, and we have honey bread, bagels, and muffins for dessert. Also, we sell fruit syrup unlike other cafes. In one part of the cafe, you can see your own cat, and there is a small terrace where you can feel the air outside and drink.",
	"It is a cafe in the building right next to Morning Glory. Overall, it is a cafe with a quiet atmosphere and a warm color. There is plenty of table space, so there are chairs where you can sit alone, so it's a good cafe to study alone. It's a cafe that hasn't been long since it was opened. A part of the cafe is made of glass, so it's good to spend time in a small park. The design is pretty, so it's good to take pictures. The price is around 3~5000 won, so you can enjoy it without any burden. When you order a drink, the chocolate that comes with it keeps you from getting bored. The menu is similar to a regular cafe.",
	"This is a cafe in Taepyeong-dong. On the second floor, you can feel the interior, on the third floor, and on the rooftop, you can feel different from other cafes. There is no menu that is much different from other cafes, and the price is about 4000 to 6000 won. This cafe sells bakeries for dessert, but it's not packed and it's set up to create an atmosphere. You can have delicious desserts at various prices.",
	
	"A bar in about five minutes away from school. You can have rice and drinks without alcohol and very large store, but many people were allowed. Motives or dining room are about 10, department or older, you can enjoy together in groups with. Gachon University students last day, constantly short of the table is very popular do you recommend you for what you want to make a reservation by phone. There are a variety of dishes and alcohol is comfortable, you can have you can directly and eat it. There are affordable snack volume a lot of good dishes.",
	"It's a good Chashutang restaurant with good cost-effectiveness just 5 minutes from school. Properly dark lighting and wooden furniture create an atmosphere. We don't have a room, but it's a good bar for a reasonable number of people to go and talk to. The main menu is chicken and chashu, and 'chashutang' is a famous place, so please try it.",
	"It's a bar just a short walk from the main gate to Gachon University Station. Seafood Rose Pasta is famous and sells fruit liquor not found in other bars. It's a little expensive for about 7,000 won, but it's delicious, so please try it. It's not a big room, but it has two completely separate rooms and a refrigerator in it, making it convenient to take out alcohol and drink whenever you need it.",
	
	"Based on Gachon University, you can get to Hangang Park in about 30 minutes by subway. It's close enough to go when you want to feel the atmosphere of the Han River. It's good to open a mat and buy a variety of food to create an atmosphere, rent a bike or take a light walks. It is easy to move around because there is Konkuk University Street nearby, and the atmosphere of the Han River itself is great for healing. Why don't you finish your day with comfort from the scenery of the Han River after a long day of school life? It's good to see the forest of buildings, the scenery of rivers, the sunset and the park.",
	"It's about 15 minutes by public transportation based on Gachon University. It's a lake just below the Lotte Tower in Jamsil, and the 30-minute long walkway is well formed, and the tower and the lake combine to create beautiful scenery. Especially, the night view is beautiful, and in spring, cherry blossoms spread on all the trees and are famous for cherry blossom places. There's a beer place in the middle of the trail, so it's good to have a beer with your friend while looking at the lake.",
	"You can go to about 20 minutes using public transportation. There are all indoors and outdoors a very diverse. Like a roller coaster rides and recover from stress and mouth through a variety of food can you do it. Could they lease the school uniform in all seasons do you do that around reminiscing about the memories of the students are fine. In spring, cherry blossoms are a makeup or costumes for Halloween, October 31, the accused, it's really fun to see people who. Please always so Don't miss a parade in the evening. Ticket discounts, so I hope you'll know."
]

var slot_img = [
	"img/slot-img/res1.jpg",
	"img/slot-img/res2.jpg",
	"img/slot-img/res3.jpg",
	"img/slot-img/res4.jpg",
	
	"img/slot-img/cafe1.jpg",
	"img/slot-img/cafe2.jpg",
	"img/slot-img/cafe3.jpg",
	"img/slot-img/cafe4.jpg",
	
	"img/slot-img/bar1.jpg",
	"img/slot-img/bar2.jpg",
	"img/slot-img/bar3.jpg",
	
	"img/slot-img/heal1.jpg",
	"img/slot-img/heal2.jpg",
	"img/slot-img/heal3.jpg"
]

var slisting_img = [
	"img/menu-img/res1.jpg",
	"img/menu-img/res2.jpg",
	"img/menu-img/res3.jpg",
	"img/menu-img/res4.jpg",
	
	"img/menu-img/cafe1.jpg",
	"img/menu-img/cafe2.jpg",
	"img/menu-img/cafe3.jpg",
	"img/menu-img/cafe4.jpg",
	
	"img/menu-img/bar1.jpg",
	"img/menu-img/bar2.jpg",
	"img/menu-img/bar3.jpg",
	
	"img/menu-img/heal1.jpg",
	"img/menu-img/heal2.jpg",
	"img/menu-img/heal3.jpg"
]

var place_menu = [
	["덮밥 | DupBap", "라면 | Ramen", "연어 사시미 | Salmon sashimi", "냉소바 | Cool Soba"],
	["매콤 돈까스 | Hot Pork Cutlet", "치즈 돈까스 | Cheese Cutlet", "생등심 돈까스 | Raw Sirloin Pork Cutlet", "칡물냉면 | Arrowroot Cold Nuddle", "칡비빔냉면 | Arrowroot Bibim Cold Nuddle"],
	["함박 스테이크 | Hambak Steak", "매콤 함박 | Hot Hambak", "청양 까르보나라 | CheongYang Carbonara", "매콤 치즈 함박 | Hot Cheese Hambak"],
	["김밥 | Gimbap", "분식 | Korean school Food", "한식 | Korean Food", "양식 | Western Food"],
	
	["코코넛 밀크티 | Coconut Milk Tea", "토마토 주스 | Tomato Juice", "후르츠 에이드 | Fruit Aid", "커피 | Coffee", "디저트 | Dessert"],
	["허니브레드 | Honey Bread", "베이글 | Bagel", "머핀 | Muffin", "과일청 | Fruit Syrup"],
	["디저트 | Dessert", "커피 | Coffee", "다른 카페와 유사함 | Similar to other cafés."],
	["베이커리 | Bakery", "다른 카페와 유사함 | Similar to other cafés."],
	
	["술 | Alcohol", "음료 | Drinks", "안주 | Snack for alcohol"],
	["치킨 | Chicken", "차슈탕 | Chashutang", "술 | Alcohol"],
	["해물 로제파스타 | Seafood Rose Pasta", "과일주 | Fruit alcohol", "음료 | Drinks"],
	
	null,
	null,
	null
]

var place_menu_detalis = [
	[null],
	[null],
	[null],
	[null],
	
	[null],
	[null],
	[null],
	[null, "Dessert, Coffies..."],
	
	[null],
	[null, "Main Dish of this restaurant", null],
	["Main Dish of this restaurant", null, null],
	
	[null],
	[null],
	[null]
]

var district_points = [
	[37.462960, 127.139877],
	[37.445264, 127.131890],
	[37.545722, 127.085870],
	[37.504463, 127.116181]
]

var places_points = [
	[37.454468, 127.127620],
	[37.447791, 127.127625],
	[37.448700, 127.127002],
	[37.448700, 127.127002],
	
	[37.453157, 127.127615],
	[37.453442, 127.127269],
	[37.453357, 127.127273],
	[37.443948, 127.127428],
	
	[37.448182, 127.127429],
	[37.447835, 127.127669],
	[37.448524, 127.127094],
	
	[37.529414, 127.073979],
	[37.508062, 127.100681],
	[37.511269, 127.098027]
]

var week_declare = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

var opening_hour = [
	//["Mon", "Tues", "Wed", "Thur", "Fri", "Satur", "Sun"],
	["11 AM - 10 PM", "11 AM - 10 PM", "11 AM - 10 PM", "11 AM - 10 PM", "11 AM - 10 PM", "11 AM - 10 PM", "11 AM - 10 PM"],
	["11 AM - 9 PM", "11 AM - 9 PM", "11 AM - 9 PM", "11 AM - 9 PM", "11 AM - 9 PM", "11 AM - 9 PM", "11 AM - 9 PM"],
	["11 AM - 8 PM", "11 AM - 8 PM", "11 AM - 8 PM", "11 AM - 8 PM", "11 AM - 8 PM", "Closed", "Closed"],
	["11 AM - 5 PM", "11 AM - 5 PM", "11 AM - 5 PM", "11 AM - 5 PM", "11 AM - 5 PM", "11 AM - 5 PM", "Closed"],
	
	["9 AM - 0 AM", "9 AM - 0 AM", "9 AM - 0 AM", "9 AM - 0 AM", "9 AM - 0 AM", "10 AM - 1 PM", "10 AM - 1 PM"],
	["9 AM - 10 PM", "9 AM - 10 PM", "9 AM - 10 PM", "9 AM - 10 PM", "9 AM - 10 PM", "11 AM - 10 PM", "11 AM - 10 PM"],
	["10 AM - 10 PM", "10 AM - 10 PM", "10 AM - 10 PM", "10 AM - 10 PM", "10 AM - 10 PM", "10 AM - 10 PM", "10 AM - 10 PM"],
	["12 PM - 10 PM", "12 PM - 10 PM", "12 PM - 10 PM", "12 PM - 10 PM", "12 PM - 10 PM", "12 PM - 10 PM", "12 PM - 10 PM"],
	
	["6 PM - 3 AM", "6 PM - 3 AM", "6 PM - 3 AM", "6 PM - 3 AM", "6 PM - 3 AM", "6 PM - 3 AM", "Closed"],
	["6 PM - 3 AM", "6 PM - 3 AM", "6 PM - 3 AM", "6 PM - 3 AM", "6 PM - 3 AM", "6 PM - 3 AM", "Closed"],
	["2 PM - 3 AM", "2 PM - 3 AM", "2 PM - 3 AM", "2 PM - 3 AM", "2 PM - 3 AM", "Closed", "Closed"],
	
	["", "", "", "", "", "", ""],
	["", "", "", "", "", "", ""],
	["10 AM - 9 PM", "10 AM - 9 PM", "10 AM - 9 PM", "10 AM - 9 PM", "10 AM - 9 PM", "10 AM - 9 PM", "10 AM - 9 PM"],
	
]

// restaurant
push(places, new data_declare("겐코 | GenKo", types_real[0], districts[0], description[0]));
push(places, new data_declare("태평 돈까스 | TaePyeong Pork Cutlet", types_real[0], districts[1], description[1]));
push(places, new data_declare("오메가 함박 | Omega Hanbak", types_real[0], districts[1], description[2]));
push(places, new data_declare("푸드타운 | Food Town", types_real[0], districts[1], description[3]));

push(places, new data_declare("모퉁 | Motoong", types_real[1], districts[0], description[4]));
push(places, new data_declare("오르막 | Ormak", types_real[1], districts[0], description[5]));
push(places, new data_declare("1988", types_real[1], districts[0], description[6]));
push(places, new data_declare("어웨이크 | Awake", types_real[1], districts[1], description[7]));

push(places, new data_declare("쩡이 포차 | JJeongYi PoCha", types_real[2], districts[1], description[8]));
push(places, new data_declare("아지트 | Azit", types_real[2], districts[1], description[9]));
push(places, new data_declare("엘미오 두번째 이야기 | The Second Story of ElMio", types_real[2], districts[1], description[10]));

push(places, new data_declare("뚝섬 한강공원 | DDukSum Han River Park", types_real[3], districts[2], description[11]));
push(places, new data_declare("잠실 석촌호수 | Jamsil SeokChon Lake", types_real[3], districts[3], description[12]));
push(places, new data_declare("잠실 롯데월드 | Jamsil Lotte World", types_real[3], districts[3], description[13]));
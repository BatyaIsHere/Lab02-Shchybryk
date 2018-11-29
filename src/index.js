import './scss/main.scss';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

let _item = require('./modules/show_item');
let _productHTML = require('./modules/product-html');
let _categoryHTML = require('./modules/show-categoris');
let _item_description = require('./modules/show_description');
let SERVER_NAME = "http://nit.tron.net.ua";
jQuery.ajax({
	url: 'https://nit.tron.net.ua/api/product/list',
	method: 'get',
	dataType: 'json',
	success: function(json) {
		json.forEach(product => $('.product_item').append(_productHTML(product)));
	},
	error: function(xhr) {
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	},
});
$(document).ready(function() {
   $('#categories').append(_categoryHTML({id: "1", name: "All", description: "All products"}))
	$.getJSON('https://nit.tron.net.ua/api/category/list', function(data) {
         
		data.forEach((category) => {
			$('#categories').append(_categoryHTML(category));
		});
		$('p.load').on('click', function() {
            let api;
            $(".product_item").html('');
			$(".product_view").html('');
			var id = this.id;
            if(this.id=="1All"){
                console.log("all");
                 api= 'http://nit.tron.net.ua/api/product/list'
            }else{
                  api='http://nit.tron.net.ua/api/product/list/category/'+ parseInt(id, 10);
            }
			$.getJSON(api, function(data) {
				data.forEach((product) => {
					console.log("in for");
					let $productHTML = _productHTML(product);
					$('.product_item').append($productHTML);
				});
			});
		});
		$('div.product_item').on('click', function() {
			var name_ = $(this).attr('name');
		});
	});
});
$(document).on('click', '.card', function() {
	var $this = $(this);
	var id = $this.closest('.card').data('product-id');
	$(".product_item").html('');
	$(".product_view").html('');
	$.getJSON('http://nit.tron.net.ua/api/product/' + id, function(data) {
		let $itemDescription = _item_description(data);
		$('.product_view').append($itemDescription);
		$('.product_view').append($itemDescription);
	});
});
$(function(){
	'use strict';	
	$.MyCart({
			buttons: '.add_item',
			cartLabel: '.label-place',
			visibleLabel: true,
			openByAdding: false,
			currency: '₴'
	});	
	
});
(function(d) {
	var a, k, g = "",
		n = 0,
		p = !1,
		l = d('<div class="MyCart-cart-label"><span class="MyCart-title">&#128722</span><span class="MyCart-total-cnt">0</span></div>'),
		h = {
			buttons: ".add_item",
			cartLabel: "body",
			visibleLabel: !1,
			openByAdding: !1,
			handler: "/",
			currency: "$"
		},
		c = {
			init: function(b) {
				h = d.extend(h, b);
				a = c.getStorage();
				if (null !== a && Object.keys(a).length) {
					for (var e in a) a.hasOwnProperty(e) && (n += a[e].count);
					p = !0
				}
				l.prependTo(h.cartLabel)[p || h.visibleLabel ? "show" : "hide"]().on("click", c.openCart).find(".MyCart-total-cnt").text(n);
				d(document).on("click", h.buttons, c.addToCart).on("click", ".MyCart-layout", function(b) {
					b.target === this && c.hideCart()
				}).on("click", ".MyCart-incr", c.changeAmount).on("input keyup", ".MyCart-amount", c.changeAmount).on("click", ".MyCart-del-item", c.delFromCart).on("submit", ".MyCart-orderform", c.sendOrder).on("reset", ".MyCart-orderform", c.hideCart).on("click", ".MyCart-print-order", c.printOrder);
				return !1
			},
			addToCart: function(b) {
				b.preventDefault();
				k = d(this).data();
				if ("undefined" === typeof k.id) return console.log("Щось пішло не так"), !1;
				a = c.getStorage() || {};
				a.hasOwnProperty(k.id) ? a[k.id].count++ : (k.count = 1, a[k.id] = k);
				c.setStorage(a);
				c.changeTotalCnt(1);
				l.show();
				h.openByAdding && c.openCart();
				return !1
			},
			delFromCart: function() {
				var b = d(this).closest(".MyCart-tr"),
					e = b.data("id");
				a = c.getStorage();
				c.changeTotalCnt(-a[e].count);
				delete a[e];
				c.setStorage(a);
				b.remove();
				c.recalcSum();
				return !1
			},
			changeAmount: function() {
				var b = d(this),
					e = b.hasClass("MyCart-amount"),
					g = +(e ? b.val() : b.data("incr")),
					f = b.closest(".MyCart-tr").data("id");
				a = c.getStorage();
				a[f].count = e ? isNaN(g) || 1 > g ? 1 : g : a[f].count + g;
				1 > a[f].count && (a[f].count = 1);
				e ? b.val(a[f].count) : b.siblings("input").val(a[f].count);
				c.setStorage(a);
				c.recalcSum();
				return !1
			},
			recalcSum: function() {
				var b = 0,
					e, a = 0,
					f = 0;
				d(".MyCart-tr").each(function() {
					e = +d(".MyCart-amount", this).val();
					a = Math.ceil(e * d(".MyCart-price", this).text() * 100) / 100;
					d(".MyCart-sum", this).html(a + " " + h.currency);
					b = Math.ceil(100 * (b + a)) / 100;
					f += e
				});
				d(".MyCart-subtotal strong").text(b);
				d(".MyCart-total-cnt").text(f);
				0 >= f && (c.hideCart(), h.visibleLabel || l.hide());
				return !1
			},
			changeTotalCnt: function(b) {
				var e = d(".MyCart-total-cnt");
				e.text(+e.text() + b);
				return !1
			},
			openCart: function() {
				var b = 0;
				a = c.getStorage();
				g = '<p class="MyCart-cart-title">Кошик<span class="MyCart-print-order"></span></p><div class="MyCart-table-wrapper"><div class="MyCart-manage-order"><div class="MyCart-thead"><div>ID</div><div></div><div>Найменування</div><div>Ціна</div><div>Кіл-ть</div><div>Сума</div></div>';
                
               
				var e;
				for (e in a)
					if (a.hasOwnProperty(e)) {
						var k = Math.ceil(a[e].count * a[e].price * 100) / 100;
						b = Math.ceil(100 * (b + k)) / 100;
						g += '<div class="MyCart-tr" data-id="' + a[e].id + '">';
						g += '<div class="MyCart-small-td">' + a[e].id + "</div>";
						g += '<div class="MyCart-small-td MyCart-item-img"><img src="' + a[e].img + '" alt=""></div>';
						g += "<div>" + a[e].title + "</div>";
						g += '<div class="MyCart-price">' + a[e].price + "</div>";
						g += '<div><span class="MyCart-incr" data-incr="-1">&#8211;</span><input type="text" class="MyCart-amount" value="' + a[e].count + '"><span class="MyCart-incr" data-incr="1">+</span></div>';
						g += '<div class="MyCart-sum">' + k + " " + h.currency + "</div>";
						g += '<div class="MyCart-small-td"><span class="MyCart-del-item"></span></div>';
						g += "</div>"
					}
				g += "</div></div>";
				g += '<div class="MyCart-subtotal">Разом: <strong>' + b + "</strong> " + h.currency + "</div>";
				b = b ? g + '<p class="MyCart-cart-title" >Контактна інформація</p><form class="MyCart-orderform" id="end-form" method="POST" ><p><label>ПІБ:</label><input type="text" name="name"></p><p><label>Телефон:</label><input type="text" name="phone"></p><p><label>Email:</label><input type="text" name="email"></p><p><label>Адреса:</label><input type="text" name="address"></p><p><label>Коментар:</label><textarea name="comment"></textarea></p><p><input type="submit" id="end-submit" value="Надіслати замовлення"><input type="reset" value="Повернутися до покупок"></p></form>' : '<h2 class="MyCart-empty-cart">Кошик пустий</h2>';
				d('<div class="MyCart-layout"><div class="MyCart-checkout">123</div></div>').appendTo("body").find(".MyCart-checkout").html(b)
			},
			hideCart: function() {
				d(".MyCart-layout").fadeOut("fast", function() {
					d(this).remove()
				});
				return !1
			},
			sendOrder: function(b) {
				b.preventDefault();
               
				b = d(this);
				if ("" === d.trim(d("[name=name]", b).val()) || "" === d.trim(d("[name=phone]", b).val())) return d('<p class="MyCart-error">Вкажіть, будь-ласка, ім&apos;я та телефон!</p>').insertBefore(b).delay(1000).fadeOut(), !1;
                var t="";
                var e;
                	for (e in a){
					if (a.hasOwnProperty(e)) {
                    t+="products["+e+"]="+a[e].count+"&";
                    }
                    }
                t=t.substring(0,t.length-1);
               let k=("token=-YollNrxbx-44D3umaqA&"+b.serialize()).replace(new RegExp("address=" + d.trim(d("[name=address]", b).val()) + "&comment="+d.trim(d("[name=comment]", b).val())), '')
                k+=t;
				d.ajax({
                    url:  'https://nit.tron.net.ua/api/order/add',
					type: "post",
                    data: k ,
					success: function(res) { console.log(res)},
                    error: function() {}
				});
			},
			printOrder: function() {
				var b = d(this).closest(".MyCart-checkout").prop("outerHTML");
				if (!b) return !1;
				var a = window.open("", "\u041f\u0435\u0447\u0430\u0442\u044c \u0437\u0430\u043a\u0430\u0437\u0430", "width=" + screen.width + ",height=" + screen.height),
					c = d(a.opener.document).find('link[href$="MyCart.css"]').attr("href"),
					f = new Date,
					f = ("0" + f.getDate()).slice(-2) + "-" + ("0" + (f.getMonth() + 1)).slice(-2) + "-" + f.getFullYear() + " " + ("0" + f.getHours()).slice(-2) + ":" + ("0" + f.getMinutes()).slice(-2) + ":" + ("0" + f.getSeconds()).slice(-2);
				a.document.write("<html><head><title>Замовлення " + f + "</title>");
				a.document.write('<link rel="stylesheet" href="' + c + '" type="text/css" />');
				a.document.write("</head><body >");
				a.document.write(b);
				a.document.write("</body></html>");
				setTimeout(function() {
					a.document.close();
					a.focus();
					a.print();
					a.close()
				}, 100);
				return !0
			},
			setStorage: function(a) {
				localStorage.setItem("MyCart", JSON.stringify(a));
				return !1
			},
			getStorage: function() {
				return JSON.parse(localStorage.getItem("MyCart"))
			}
		},
		m = {
			clearCart: function() {
				localStorage.removeItem("MyCart");
				l[h.visibleLabel ? "show" : "hide"]().find(".MyCart-total-cnt").text(0);
				c.hideCart()
			},
			openCart: c.openCart,
			printOrder: c.printOrder,
			test: function() {
				c.getStorage()
			}
		};
	d.MyCart = function(a) {
		if (m[a]) return m[a].apply(this, Array.prototype.slice.call(arguments, 1));
		if ("object" !== typeof a && a) d.error('\u041c\u0435\u0442\u043e\u0434 \u0441 \u0438\u043c\u0435\u043d\u0435\u043c "' + a + '" \u043d\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442!');
		else return c.init.apply(this, arguments)
	}
})(jQuery);


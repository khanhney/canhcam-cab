var data = {
	SETUP: {}
}
var objectName = ''
var pages = ['index']
var dataSites = {
	color: 'main: #2196f3,extra: #ec8b00,front: #659f13,back: #f1c40f,cyan-1: #1abc9c,cyan-2: #16a085,la-1: #2ecc71,la-2: #27ae60,duong-1: #3498db,duong-2: #2980b9,tim-1: #9b59b6,tim-2: #8e44ad,vang-1: #f1c40f,vang-2: #f39c12,cam-1: #e67e22,cam-2: #d35400,do-1: #e74c3c,do-2: #c0392b,den-1: #34495e,den-2: #2c3e50,xam-1: #95a5a6,xam-2: #7f8c8d,hong-1: #ff9ff3,hong-2: #f368e0,trang: #ffffff,den: #000000',
	js: '"DEV_MODE":true,"DEV_MODE_GIRD_FULL":false,"ACTIVE_FIXED_FOOTER":true,"ACTIVE_BACKTOTOP":true,"ACTIVE_RESPONSIVE":true,"DISPLAY_FOOTER":600,"DISPLAY_BACKTOTOP":100,"CHANGE_GRID":991'
}

$('.mainList').each(function (i, e) {
	var sortableMain = new Sortable.create(e, {
		group: {
			name: 'mainList',
			pull: "clone"
		},
		ghostClass: 'sortable-ghost',
		animation: 100
	});
})

function createList(toAdd) {
	data.SETUP[toAdd] = []
	$('.newlist').each(function (i, e) {
		var sortable = new Sortable.create(e, {
			group: {
				put: 'mainList',
				pull: false
			},
			onAdd: function (evt) {
				getlist()
			},
			onClone: function (evt) {
				getlist()
			},
			onRemove: function (evt) {
				getlist()
			},
			onAdd: function (evt) {
				getlist()
			},
			onUpdate: function (evt) {
				getlist()
			},
			onEnd: function (evt) {
				getlist()
			},
			animation: 100
		});
		$('.mainList').on('dragenter', function () {
			$('.sortable-ghost', e).remove();
		});
		function getlist() {
			$('.newlist').each(function () {
				if ($('.newlist').html().trim().length > 0) {
					$(this).addClass('cnt')
				} else {
					$(this).removeClass('cnt')
				}
			})
			var optionTexts = {
				header: [],
				body: [],
				footer: []
			};
			$(e).find(".list-group-item").each(function () {
				if ($(this).attr("data-type") === 'header') {
					optionTexts.header.push($(this).attr("data-key"))
				} else if ($(this).attr("data-type") === 'body') {
					optionTexts.body.push($(this).attr("data-key"))
				} else {
					optionTexts.footer.push($(this).attr("data-key"))
				}
			});
			data.SETUP[toAdd] = optionTexts
			// console.log(data)
		}
	})
}

$('#buttonListItemMain').click(function () {
	var toAdd = removeVietnam($('input[name=ListItemMain]').val().trim());
	if (toAdd) {
		objectName = toAdd
		$('.deview h4').html("Dự Án: " + objectName)
		$('#toDoListMain').hide()
		$('#toDoListMain')[0].reset();
		$('#toDoList').show()
		alert('Thêm dự án thành công!, hãy tiếp tục tạo page trên dự án.')
		createIndex()
	} else {
		return false
	}
});

$('#createsite').click(function (e) {
	e.preventDefault();
	var newData = data
	if (confirm("Bạn có chắc chắn tạo site ngay bây giờ?")) {
		jQuery.post("/createsite", { name: objectName, data: newData }, function (data) {
			if (data === 'done') {
				$('#toDoListMain').show()
				$('#toDoList, .deview').hide()
				$('.notedcanhcam').show()
				$('.notedcanhcam .alert').show()
				$('.createcanhcam').hide()
				$('#myTab').removeClass('cnt')
				$('#myTab, #nav-tabContent').html('')
				data = {
					SETUP: {}
				}
				objectName = ''
				pages = ['index']
			}
		});
	} else {
		return false
	}
});

function checkValue(value, arr) {
	return ($.inArray(value, arr) > -1);
}

function createIndex() {
	if (pages.length == 1) {
		var toAdd = "index";
		$('.noleft .nav-tabs').append('<li class="nav-item"><a class="nav-link" id="' + toAdd + '-tab" data-toggle="tab" href="#' + toAdd + '" role="tab" aria-controls="' + toAdd + '" aria-selected="true">' + toAdd + '.html</a></li>');
		$('.noleft #nav-tabContent').append('<div class="tab-pane fade" id="' + toAdd + '" role="tabpanel" aria-labelledby="' + toAdd + '-tab"><div class="list-group newlist"></div></div>');
		$('#toDoList')[0].reset();
		$('#' + toAdd + '-tab').trigger('click')
		createList(toAdd)
		checkTab()
	}
}

$('#button').click(function () {
	var toAdd = removeVietnam($('input[name=ListItem]').val().trim());
	if (!checkValue(toAdd, pages)) {
		if (toAdd) {
			$('.noleft .nav-tabs').append('<li class="nav-item"><a class="nav-link" id="' + toAdd + '-tab" data-toggle="tab" href="#' + toAdd + '" role="tab" aria-controls="' + toAdd + '" aria-selected="true">' + toAdd + '.html<span class="btn btn-sm btn-danger" data-id="' + toAdd + '"><i class="fa fa-close"></i></span></a></li>');
			$('.noleft #nav-tabContent').append('<div class="tab-pane fade" id="' + toAdd + '" role="tabpanel" aria-labelledby="' + toAdd + '-tab"><div class="list-group newlist"></div></div>');
			$('#toDoList')[0].reset();
			$('#' + toAdd + '-tab').trigger('click')
			createList(toAdd)
			checkTab()
			pages.push(toAdd)
		} else {
			return false
		}
	} else {
		alert('Chưa nhập tên hoặc đã tồn tại trang này!')
		$('#toDoList')[0].reset();
	}
});

$(function () {
	checkFormDisable("customCheck1", "customCheck2")
	$('#customCheck1').click(function () {
		checkFormDisable("customCheck1", "customCheck2")
	})
});

function checkFormDisable(a, b) {
	if ($('#' + a).prop("checked")) {
		$('#' + b).attr("disabled", false);
		$('#' + b).prop("checked", false);
	} else {
		$('#' + b).attr("disabled", true);
		$('#' + b).prop("checked", false);
	}
}

$('#sbm').click(function () {
	var pargam = []
	var pargamJS = []
	var dataColor, dataJS;
	$("#settings input[type=text]").each(function () {
		var input = $(this).val()
		var inputattr = $(this).parents('.cppicker').find('.input-group-text').html()
		pargam.push(inputattr + ": " + input)
	});
	$("#jsf input[type=checkbox]").each(function () {
		var inputJS = $(this).prop("checked")
		var inputJSName = $(this).attr('data-key')
		pargamJS.push('"' + inputJSName + '":' + inputJS)
	});
	$("#jsf input[type=text]").each(function () {
		var inputJSText = $(this).val()
		var inputJSTextName = $(this).attr('data-key')
		pargamJS.push('"' + inputJSTextName + '":' + inputJSText)
	});
	// Chua xử lý lên server
	dataColor = "$mau: (" + pargam + ")"
	dataJS = "const CANHCAM_APP = {" + pargamJS + "}"
	saveToData(dataColor.toString(), dataJS.toString())
})

function saveToData(a, b) {
	if (confirm("Bạn có chắc chắn lưu ngay bây giờ?")) {
		jQuery.post("/savedata", { dataColor: a, dataJS: b }, function (data) {
			if (data === 'done') {
				// console.log(data)
				$('#exampleModalCenter').modal('hide')
			}
		});
	} else {
		return false
	}
}

function setDefault() {
	var dataColor, dataJS;
	dataColor = "$mau: (" + dataSites.color + ")"
	dataJS = "const CANHCAM_APP = {" + dataSites.js + "}"
	saveToData(dataColor.toString(), dataJS.toString())
}

function getData() {
	jQuery.get("/getdata", function (data) {
		var e = JSON.parse(data)
		i = 0
		for (var key in e) {
			var dataKey = key
			var dataVal = e[key]

			var badge2 = document.createElement('div');
			badge2.className = 'col-12 mt-3';
			badge2.innerHTML = '<h5>Màu Phụ</h5>' +
				'<hr>';

			var badge = document.createElement('div');
			badge.className = 'col-sm-6 col-lg-3';
			badge.innerHTML =

				'<div class="form-group">' +
				'<div class="input-group colorpicker-component cppicker">' +
				'<div class="input-group-prepend">' +
				'<span class="input-group-text">' + dataKey + '</span>' +
				'</div>' +
				'<input type="text" class="form-control" value="' + dataVal + '">' +
				'<span class="input-group-addon">' +
				'<i></i>' +
				'</span>' +
				'</div>' +
				'</div>';

			if (i == 4) {
				document.getElementById("maincolor").appendChild(badge2);
			}
			document.getElementById("maincolor").appendChild(badge);
			$('.cppicker').colorpicker();
			i++
		}
	});
}

function getDataJS() {
	jQuery.get("/getdatajs", function (data) {
		var e = JSON.parse(data)
		i = 0
		for (var key in e) {
			if (i < 5) {
				if (e[key]) {
					$("[data-key='" + key + "']").prop("checked", true)
				} else {
					$("[data-key='" + key + "']").prop("checked", false)
				}
			} else {
				if (key === 'DISPLAY_FOOTER') {
					$("[data-key='DISPLAY_FOOTER']").val(e[key])
				} else if (key === 'DISPLAY_BACKTOTOP') {
					$("[data-key='DISPLAY_BACKTOTOP']").val(e[key])
				} else if (key === 'CHANGE_GRID') {
					$("[data-key='CHANGE_GRID']").val(e[key])
				}
			}
			i++
		}
	});
}

getData()
getDataJS()
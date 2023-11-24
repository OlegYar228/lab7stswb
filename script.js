var slideNow = 1;
var slideCount = $('#slidewrapper').children().length;
var slideInterval = 3000;
var navBtnId = 0;
var translateWidth = 0;

$(document).ready(function () {
    var switchInterval = setInterval(nextSlide, slideInterval);

    $('#viewport').hover(function () {
        clearInterval(switchInterval);
    }, function () {
        switchInterval = setInterval(nextSlide, slideInterval);
    });

    $('#next-btn').click(function () {
        nextSlide();
    });

    $('#prev-btn').click(function () {
        prevSlide();
    });

    $('.slide-nav-btn').click(function () {
        navBtnId = $(this).index();

        if (navBtnId + 1 != slideNow) {
            translateWidth = -$('#viewport').width() * (navBtnId);
            $('#slidewrapper').css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            slideNow = navBtnId + 1;
        }
    });
});


function nextSlide() {
    if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
        $('#slidewrapper').css('transform', 'translate(0, 0)');
        slideNow = 1;
    } else {
        translateWidth = -$('#viewport').width() * (slideNow);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow++;
    }
}

function prevSlide() {
    if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
        translateWidth = -$('#viewport').width() * (slideCount - 1);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow = slideCount;
    } else {
        translateWidth = -$('#viewport').width() * (slideNow - 2);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow--;
    }
}

$(document).ready(function () {
    $('a').on('click', function (e) {
        e.preventDefault();
    });

    $('#ddmenu li').hover(function () {
        clearTimeout($.data(this, 'timer'));
        $('ul', this).stop(true, true).slideDown(200);
    }, function () {
        $.data(this, 'timer', setTimeout($.proxy(function () {
            $('ul', this).stop(true, true).slideUp(200);
        }, this), 100));
    });

});

$(document).ready(function () {

    $("#thumbnail li a").click(function () {

        $("#large img").hide().attr({ "src": $(this).attr("href"), "title": $("> img", this).attr("title") });

        $("#large h2").html($("> img", this).attr("title"));

        return false;

    });

    $("#large>img").load(function () { $("#large>img:hidden").fadeIn("slow") });

});

$(document).ready(function () {
    
    function getCurrentDate() {
        const today = new Date();
        return {
            year: today.getFullYear(),
            month: today.getMonth(),
            day: today.getDate()
        };
    }


    function renderCalendar(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        let html = '';
        let day = 1;

        for (let i = 0; i < 6; i++) {

            html += '<tr>';

            for (let j = 0; j < 7; j++) {

                if ((i === 0 && j < startingDay) || (day > daysInMonth)) {
                    html += '<td></td>';
                } else {
                    const currentDate = getCurrentDate();
                    const isToday = (day === currentDate.day && month === currentDate.month && year === currentDate.year);
                    html += '<td' + (isToday ? ' class="today"' : '') + '>' + day + '</td>';
                    day++;
                }
            }

            html += '</tr>';
        }

        $('#calendar tbody').html(html);
    }


    const currentDate = getCurrentDate();
    renderCalendar(currentDate.year, currentDate.month);

    $('#calendar').on('click', 'td', function () {
        alert('Выбран день: ' + $(this).text());
    });
});
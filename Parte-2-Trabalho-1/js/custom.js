var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
    $BODY = $('body'),
    $MENU_TOGGLE = $('#menu_toggle'),
    $MENU_LATERAL = $('#sidebar-menu'),
    $SIDEBAR_FOOTER = $('.sidebar-footer'),
    $LEFT_COL = $('.left_col'),
    $RIGHT_COL = $('.right_col'),
    $NAV_MENU = $('.nav_menu'),
    $FOOTER = $('footer');

function init_sidebar() {
    
    var setContentHeight = function () {
    
        $RIGHT_COL.css('min-height', $(window).height());

        var bodyHeight = $BODY.outerHeight(),
            footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
            leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
            contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

        contentHeight -= $NAV_MENU.height() + footerHeight;

        $RIGHT_COL.css('min-height', contentHeight);
    };

    var openUpMenu = function () {
        $MENU_LATERAL.find('li').removeClass('active active-sm');
        $MENU_LATERAL.find('li ul').slideUp();
    }

    $MENU_LATERAL.find('a').on('click', function (ev) {
        var $li = $(this).parent();

        if ($li.is('.active')) {
            $li.removeClass('active active-sm');
            $('ul:first', $li).slideUp(function () {
                setContentHeight();
            });
        } else {
            if (!$li.parent().is('.child_menu')) {
                openUpMenu();
            } else {
                if ($BODY.is('nav-sm')) {
                    if (!$li.parent().is('child_menu')) {
                        openUpMenu();
                    }
                }
            }

            $li.addClass('active');

            $('ul:first', $li).slideDown(function () {
                setContentHeight();
            });
        }
    });

    $MENU_TOGGLE.on('click', function () {
        if ($BODY.hasClass('nav-md')) {
            $MENU_LATERAL.find('li.active ul').hide();
            $MENU_LATERAL.find('li.active').addClass('active-sm').removeClass('active');
        } else {
            $MENU_LATERAL.find('li.active-sm ul').show();
            $MENU_LATERAL.find('li.active-sm').addClass('active').removeClass('active-sm');
        }

        $BODY.toggleClass('nav-md nav-sm');

        setContentHeight();

        $('.dataTable').each(function () { $(this).dataTable().fnDraw(); });
    });

    $MENU_LATERAL.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

    $MENU_LATERAL.find('a').filter(function () {
        return this.href == CURRENT_URL;
    }).parent('li').addClass('current-page').parents('ul').slideDown(function () {
        setContentHeight();
    }).parent().addClass('active');

    setContentHeight();
}

function do_limpar() {
    $('#nm_cidade').val('');
    $('#nm_equipe').val('');
    $('#nm_modalidade').val('');
    $('[id^=group-scoreboard]').each(function(){
        $(this).show();
    });
}

function init_validator() {

    if (typeof (validator) === 'undefined') { return; }
    console.log('init_validator');
    validator.message.date = 'Não é uma data valida';

    $('form')
        .on('blur', 'input[required], input.optional, select.required', validator.checkField)
        .on('change', 'select.required', validator.checkField)
        .on('keypress', 'input[required][pattern]', validator.keypress);

    $('.multi.required').on('keyup blur', 'input', function () {
        validator.checkField.apply($(this).siblings().last()[0]);
    });

    $('form').submit(function (e) {
        e.preventDefault();
        var submit = true;

        if (!validator.checkAll($(this))) {
            submit = false;
        }

        if (submit)
            this.submit();

        return false;
    });

};

function do_filtrar(){

    $('[id^=group-scoreboard]').each(function(){
        $(this).show();
    });

    var nm_equipe = $('#nm_equipe').val();

    if(isNull(nm_equipe)){
        alert('O campo Equipe é obrigatório.');
        return;
    }

    var nm_cidade = $('#nm_cidade').val();
    var nm_modalidade = $('#nm_modalidade').val();

   for (var i = 1; i <= 5; i++) {
        var row = $('#group-scoreboard-'+i);
        if(nm_equipe != $('#vl_equipe_l_'+i).text() || nm_equipe != $('#vl_equipe_r_'+i).text()){
            row.hide();
        }
        if(!isNull(nm_cidade)){
            if(nm_cidade != row.find(".vl_cidade").text()){
                row.hide();
            }
        }
        if(!isNull(nm_modalidade)){
            if(nm_modalidade != row.find('.vl_modalidade').text()){
                row.hide();
            }
        }
    }

}

function isNull(arg) {
    return arg == null || arg == undefined || arg == '';
}

function init_charts() {

    if ($('#pieChart').length) {

        var ctx = document.getElementById("pieChart");
        var data = {
            datasets: [{
                data: [3, 0, 2, 1, 2],
                backgroundColor: [
                    "#455C73",
                    "#9B59B6",
                    "#BDC3C7",
                    "#26B99A",
                    "#3498DB"
                ],
                label: 'My dataset' // for legend
            }],
            labels: [
                "LA Kabum",
                "Team Liquid",
                "Royal star",
                "SKT T1",
                "G2A",
            ]
        };

        var pieChart = new Chart(ctx, {
            data: data,
            type: 'pie',
            otpions: {
                legend: false
            }
        });

    }

}

$(document).ready(function () {

    init_sidebar();
    init_charts();

});	
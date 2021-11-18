window.onload = function () {

    $('.solutions-item, .solutions-item-name, .solutions-item-full-name, .solutions-item-line').click((e) => {
        $('.solution-description').hide();
        $('.solutions-item').removeClass('selected');
        let currentElement = $(e.target);
        let id = currentElement.data('id');
        $('#' + id).show();
        currentElement.parents('.solutions-item').addClass('selected');
        currentElement.siblings('.solutions-item-img').addClass('show');
    });


    $('#solutions, #solutions-container, #solutions-items, #solutions-title').click((e) => {
        if (e.target.id === 'solutions' || e.target.id === 'solutions-container' || e.target.id === 'solutions-items' || e.target.id === "solutions-title") {
            $('.solution-description').hide();
            $('.solutions-item').removeClass('selected');
        }
    });

    let animItems = document.getElementsByClassName('animateItems');

    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll)

        function animOnScroll() {
            for (let i = 0; i < animItems.length; i++) {
                let animItem = animItems[i];
                let animItemHeight = animItem.offsetHeight;
                let animItemOffset = offset(animItem).top;
                let animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }
                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('_active')
                } else {
                    if (animItem.classList.contains('infinity-animation')) {
                        animItem.classList.remove('_active')
                    }
                }
            }
        }

        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
        }

        setTimeout(() => {
            animOnScroll()
        }, 300);
    }

    let name = $('#name');
    let email = $('#email');
    let phone = $('#phone');
    let areaOfInterest = $('#areaOfInterest');
    let request = $('#request');


    let popup = $('#popup')

    let allInputs = $('.form-item-input');

    $('#form-submit').click(() => {
        let successInput = 5;
        for (let i = 0; i < allInputs.length; i++) {
            $('.error-input').hide();
            $('.form-item-input').removeClass('error');
        }
        for (let i = 0; i < allInputs.length; i++) {
            if (!allInputs[i].value) {
                // allInputs[i].nextElementSibling.style.display = 'block';
                $(allInputs[i]).attr('placeholder','Please fill in the field');
                $(allInputs[i]).addClass('error');
                successInput -= 1
            }
        }
        if (successInput < 5) {
            return;
        }
        $('#loader').css('display', 'flex')

        $.ajax({
            type: 'post',
            url: 'mail.php',
            data: 'name=' + name.val() + '&email=' + email.val() + '&phone=' + phone.val() + '&request=' + request.val() + '&areaOfInterest=' + areaOfInterest.val(),
            success: () => {
                $('#loader').css('display', 'none')
                $(popup).css('display', 'flex');
                $('#popup-container-name').text($('#name').val());
                setTimeout(() => {
                    $('#popup').css('display', 'none')
                }, 8000);
                $(name).val(' ');
                $(email).val(' ');
                $(phone).val(' ');
                $(areaOfInterest).val(' ');
                $(request).val(' ');
            },
            error: () => {
                alert('error')
                $('#loader').css('display', 'none')
            }
        })

    });

    $('#popup-close, #popup').click((e) => {
        if (e.target.id === 'popup' || e.target.id === 'popup-close') {
            $('#popup').css('display', 'none');
        }
    });

    $('.solution-description-close').click((e)=>{
        $('.solution-description').css('display','none');
        $('.solutions-item').removeClass('selected');
    })

    $('.solution-description a').click((e)=>{
        $('.solution-description').css('display','none');
        $('.solutions-item').removeClass('selected');
    })

    var rellax = new Rellax('.rellax');
}
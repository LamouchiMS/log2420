$(function () {
    // Gerer le click sur le boutton general
    $('#general').click(function () {
        $.get('./fs_general.php', function (result, status) {
            var newHTML = $(result).find('table');
            console.log(newHTML)
            document
                .getElementById('content')
                .innerHTML = newHTML[0].innerHTML;
        });
    });

    // Gerer le click sur le boutton reaction
    $('#reaction').click(function () {
        $.get('./fs_reaction.php', function (result, status) {
            var newHTML = $(result).find('table');
            console.log(newHTML)
            document
                .getElementById('content')
                .innerHTML = newHTML[0].innerHTML;
        });
    });
});
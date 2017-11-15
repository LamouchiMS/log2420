$(function () {
    $("#slider").slider({
        max: 40,
        min: -10,
        orientation: 'vertical',
        step: 10,
        value: temperatureThermostat
    });

    $("#slider").on("slide", function (event, ui) {
        chrono(ui.value);
    });

    function chrono(val) {
        setTimeout(() => {
            $('#tdValeurThermostat').html(val);
            $('.temperature').html(positionThermometre);
            $('.innerThermometre').css('height', (`${(positionThermometre * 100) / (thermometreMax - thermometreMin)}%`));
            $('#chaffage').html(chauffage ? 'Actif' : 'Inactif');
            $('#tempExt').html(temperatureExterieure);
            $('#tdValeurThermostat').html(temperatureThermostat);
        }, intervalleTemps);
    }
});
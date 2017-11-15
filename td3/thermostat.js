$(function () {
    $("#slider").slider({
        max: 40,
        min: -10,
        orientation: 'vertical',
        step: 10,
        value: temperatureThermostat
    });
    var thermoVal = temperatureThermostat;
    $('#tdValeurThermostat').html(thermoVal);


    $("#slider").on("slide", function (event, ui) {
        thermoVal = ui.value;
    });

    function chrono() {
        setInterval(() => {
            $('#tdValeurThermostat').html(thermoVal);
            $('.temperature').html(positionThermometre);
            $('.innerThermometre').css('height', (`${(positionThermometre * 100) / (thermometreMax - thermometreMin)}%`));
            $('#chaffage').html(chauffage ? 'Actif' : 'Inactif');
            $('#tempExt').html(temperatureExterieure);
            ticTac();
        }, intervalleTemps);
    }

    chrono();
});

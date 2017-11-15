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
            console.log(chauffage);
            $('#tdValeurThermostat').html(thermoVal);
            $('.temperature').html(Math.round(temperatureInterieure));
            $('.innerThermometre').css('height', (`${(temperatureInterieure * 100) / (thermometreMax - thermometreMin)}%`));
            $('#chauffage').html(chauffage ? 'Actif' : 'Inactif');
            $('#chauffage').css('background-color', chauffage ? '#FF0000' : 'white');
            $('#tempExt').html(temperatureExterieure);
            ticTac();
        }, intervalleTemps);
    }

    chrono();
});

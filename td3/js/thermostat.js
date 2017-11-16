$(function () {
    // Initialize slider
    $("#slider").slider({
        max: 40,
        min: -10,
        orientation: 'vertical',
        step: 10,
        value: temperatureThermostat
    });

    // Initialize thermostat values in the View
    var thermostatVal = temperatureThermostat;
    $('#tdValeurThermostat').html(thermostatVal);

    // Initialize exterior temperature in the View
    $('#tempExt').html(temperatureExterieure);

    // Slider handler
    $("#slider").on("slide", function (event, ui) {
        thermostatVal = ui.value;
    });

    // Controller that updates the View (HTML)
    function chrono(newInteriorTemperatureVal, newChauffageVal) {
        // Thermostat
        $('#tdValeurThermostat').html(thermostatVal);

        // Thermometre
        const heightPercentage = (newInteriorTemperatureVal * 100) / (thermometreMax - thermometreMin) + (thermometreMax - thermometreMin) / 2;
        $('.temperature').html(Math.round(newInteriorTemperatureVal));
        $('.innerThermometre').css('height', (`${heightPercentage}%`));

        // Chauffage
        $('#chauffage').html(newChauffageVal ? 'Actif' : 'Inactif');
        $('#chauffage').css('background-color', newChauffageVal ? '#FF0000' : 'white');
        $('#chauffage').css('color', newChauffageVal ? 'white' : 'black');
    }

    const Observable = {
        observers: [],
        lastId: -1,
        addObserver: function (observer) {
            this.observers.push({
                callback: observer,
                id: ++this.lastId
            })

            // This ID is useful if we want to unsubscribe an observer
            return this.lastId
        },
        removeObserver: function (id) {
            const idx = this.observers.findIndex(e => id === e.id);
            if (idx > -1) {
                this.observers.splice(idx, 1);
            }
        },
        notifyObservers: function () {
            // Pass the data from the model (observable) to the observers
            this.observers.forEach(e => e.callback(temperatureInterieure, chauffage));
        }
    }

    // Create an observer & add a handler to be fired when notified
    const Observer = Observable.addObserver(chrono);

    // Notify observers each second
    setInterval(() => {
        ticTac();
        Observable.notifyObservers();
    }, intervalleTemps);
});
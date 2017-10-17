$(document)
    .ready(function () {
        // Initialisation de Google Maps
        const map = new google
            .maps
            .Map(document.getElementById('map'), {
                center: {
                    lat: -34.397,
                    lng: 150.644
                },
                zoom: 15
            });
        // Initialisation du Google Maps Marker
        const marker = new google
            .maps
            .Marker({map: map});

        // Initialisation des donnees BIXI
        $.get('https://secure.bixi.com/data/stations.json', function (result, status) {
            const stations = result.stations;
            const data = stations.map(function (e) {
                return [
                    e.id, e.s, e.ba, e.da, e.b
                        ? 'Oui'
                        : 'Non',
                    e.su
                        ? 'Oui'
                        : 'Non'
                ];
            });

            const tags = result
                .stations
                .map(function (e) {
                    return e.s
                });

            // Initialisation de l'autocomplete
            $("#tags").autocomplete({source: tags});

            // Gestion de la selection d'un element de l'autocomplete
            $("#tags").on("autocompleteselect", function (event, ui) {
                const selectedStation = stations.find(function (e) {
                    return e
                        .s
                        .toLowerCase() === ui
                        .item
                        .value
                        .toLowerCase();
                });

                // Update values
                $('#selectionValue').html(selectedStation.s);
                $('#stationId').html(selectedStation.id);
                $('#stationVelosDisponibles').html(selectedStation.ba);
                $('#stationBloquee').html(selectedStation.b
                    ? 'Oui'
                    : 'Non');
                $('#stationBornesDisponibles').html(selectedStation.da);
                $('#stationSuspendue').html(selectedStation.su
                    ? 'Oui'
                    : 'Non');
                $('#stationVelosIndisponibles').html(selectedStation.bx);
                $('#stationHorsService').html(selectedStation.m
                    ? 'Oui'
                    : 'Non');
                $('#stationBornesIndisponibles').html(selectedStation.dx);

                // Update classes if necessary
                if (selectedStation.ba === 0) {
                    $('#stationVelosDisponibles').addClass('alt-color');
                }
                if (selectedStation.su) {
                    $('#stationSuspendue').addClass('alt-color');
                }

                // Center Google Map
                map.setCenter({lat: selectedStation.la, lng: selectedStation.lo});
                // Edit Google Map marker position
                marker.setPosition({lat: selectedStation.la, lng: selectedStation.lo});
            });

            // Configurer et remplir la table
            $('#example').DataTable({
                data: data,
                columns: [
                    {
                        title: "ID"
                    }, {
                        title: "Nom Station"
                    }, {
                        title: "Vélos disponibles"
                    }, {
                        title: "Bornes disponibles"
                    }, {
                        title: "État bloqué"
                    }, {
                        title: "État suspendu"
                    }
                ],
                language: {
                    sProcessing: "Traitement en cours...",
                    sSearch: "Rechercher&nbsp;:",
                    sLengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
                    sInfo: "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;" +
                            "l&eacute;ments",
                    sInfoEmpty: "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
                    sInfoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
                    sInfoPostFix: "",
                    sLoadingRecords: "Chargement en cours...",
                    sZeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
                    sEmptyTable: "Aucune donn&eacute;e disponible dans le tableau",
                    oPaginate: {
                        sFirst: "Premier",
                        sPrevious: "Pr&eacute;c&eacute;dent",
                        sNext: "Suivant",
                        sLast: "Dernier"
                    },
                    oAria: {
                        sSortAscending: ": activer pour trier la colonne par ordre croissant",
                        sSortDescending: ": activer pour trier la colonne par ordre d&eacute;croissant"
                    }
                }
            });
        });
    });
$(document).ready(function () {
    $.get('https://secure.bixi.com/data/stations.json', function (result, status) {
        console.log(result.stations);
        const data = result.stations.map(function (e) {
            return [e.id, e.s, e.ba, e.da, e.b ? 'Oui' : 'Non', e.su ? 'Oui' : 'Non'];
        });

        const tags = result.stations.map(function (e) {
            return e.s
        });

        $("#tags").autocomplete({
            source: tags
        });

        // Fill table
        $('#example').DataTable({
            data: data,
            columns: [{
                    title: "ID"
                },
                {
                    title: "Nom Station"
                },
                {
                    title: "Vélos disponibles"
                },
                {
                    title: "Bornes disponibles"
                },
                {
                    title: "État bloqué"
                },
                {
                    title: "État suspendu"
                }
            ]
        });
    });
});
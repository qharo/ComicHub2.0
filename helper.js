module.exports = {
    'stringDivide': function (title) {
        hashIndex = title.indexOf('#');

        name = title.slice(0, hashIndex).trim();

        var finalIndex = hashIndex;
        for (i = 0; i < title.length; i++) {
            if (title[i] === ' ')
                finalIndex = i;
        }

        issue = title.slice(hashIndex + 1, finalIndex);

        rest = title.slice(finalIndex, title.length);
        year = rest.slice(rest.indexOf('(') + 1, rest.indexOf(')'));

        return {
            'name': name,
            'issue': issue,
            'year': year
        }
    },
    'getComicDateConverter': function (date) {
        i = 0;
        while (!isNaN(date[i])) {
            i++;
        }
        day = date.slice(0, i) + '/';
        return day + ('JanFebMarAprMayJunJulAugSepOctNovDec'.indexOf(date.slice(i + 3, i + 6)) + 3) / 3 + '/20' + date.slice(-2, date.length);
    },
    'comicsCodesDateConverter': function (date) {
        month = ('JanFebMarAprMayJunJulAugSepOctNovDec'.indexOf(date.slice(0, 3)) + 3) / 3
        i = 0;
        while (isNaN(date[i])) {
            i++;
        }
        return date.slice(i + 1, i + 3) + '/' + month + '/' + date.slice(-4, date.length);
    },
    'consolidation': function (values) {
        s1 = values[0];
        s2 = values[1];
        if (s1['name'] === s2['name'] && s1['issue'] === s2['issue']) 
                if (s1['date'] === s2['date'] && s1['year'] === s2['year']) 
                        same = true;
        if(same){
            toReturn = s1;
            toReturn['zippyLink'] = s2['downloadLink'];
            toReturn['image'] = s2['image'];
            return toReturn;
        }
        else
            return values;

    },
    'comicsCodesUrlGenerator': function(values){
        var name = values['name'].split(' ').join('-');
        console.log(name);
        var post = values['year'] + '/0/' + name + '-' + values['issue'] + '-' + values['year'] + '.html';
        return 'http://www.comicscodes.com/' + post;
    },
    'getComicsUrlGenerator': function(values){
        var name = values['name'].split(' ').join('-');
        var post = '0/' + name  + '-' + values['issue'] + '-' + values['year'] + '/';
        return 'https://getcomics.info/' + post;
    }
                
}

function tLM(month) {
    console.log(('JanFebMarAprMayJunJulAugSepOctNovDec'.indexOf('Mar') + 3) / 3);
}
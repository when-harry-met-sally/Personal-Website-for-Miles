import React from "react";
import * as _ from 'lodash';

export const elastic = (filter, list, searchCriteria) => {
    list =  _.cloneDeep(list);
    if (!filter || filter.trim() === ''){
        return list;
    }
    let rebuilt = [];
    list.forEach((item) => {
        let searchMatch = false;
        searchCriteria.forEach(criteria => {
            const searchString = item[criteria];
            if (!item[criteria]){
                return;
            }
            const filterLength = filter.length;
            let newField = [];
            for (let c = 0; c < searchString.length; c++){
                const comparison = searchString.slice(c, c+filterLength);
                if (comparison.toLowerCase() === filter.toLowerCase()){
                    searchMatch = true;
                    newField.push(<span key={c} className='hl'>{comparison}</span>)
                    c += comparison.length - 1;
                } else {
                    newField.push(<span key={c}>{searchString[c]}</span>);
                }
            }
            item[criteria] = newField;
        })
        if (searchMatch){
            rebuilt.push(item);
        }
    })
    return rebuilt;
}

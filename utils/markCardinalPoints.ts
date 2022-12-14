let fieldCounter = 0;
export function markCardinalPoints(fields, field:HTMLElement){
    const divide = fields.length/4;
    if(fieldCounter === 0){
        field.classList.add('cardinal-points');

    }
    if(fieldCounter === Math.round(divide)){
        field.classList.add('cardinal-points');

    }
    if(fieldCounter === (Math.round(divide) * 2)){
        field.classList.add('cardinal-points');

    }
    if(fieldCounter === (Math.round(divide) * 3)){
        field.classList.add('cardinal-points');

    }
    fieldCounter += 1;
    if(fieldCounter === fields.length){
        fieldCounter = 0
    }

}
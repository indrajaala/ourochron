let fieldCounter = 0;
export function markCardinalPoints(fields, field:HTMLElement){
    const divide = fields.length/4;
    if(fieldCounter === 0){
        field.style.backgroundColor = "black";
        field.style.border = "1px solid black"
        field.style.zIndex = "2";
    }
    if(fieldCounter === Math.round(divide)){
        field.style.backgroundColor = "black";
        field.style.border = "1px solid black"
        field.style.zIndex = "2";
    }
    if(fieldCounter === (Math.round(divide) * 2)){
        field.style.backgroundColor = "black";
        field.style.border = "1px solid black"
        field.style.zIndex = "2";
    }
    if(fieldCounter === (Math.round(divide) * 3)){
        field.style.backgroundColor = "black";
        field.style.border = "1px solid black"
        field.style.zIndex = "2";
    }
    fieldCounter += 1;
    if(fieldCounter === fields.length){
        fieldCounter = 0
    }

}
let loadAllItems=require('./data.js').loadAllItems;
let loadPromotions=require('./data.js').loadPromotions;
function Message(){//将优惠信息添加到商品列表中去
    let  allItem=loadAllItems();
    let load_promotions=loadPromotions();
    for(let i in allItem){
        for(let j in load_promotions){
            if(load_promotions[j].type==='BUY_TWO_GET_ONE_FREE'){
               if(load_promotions[j].barcodes.includes(allItem[i].barcode)){
                  allItem[i].charge="买二赠一";
               }else{
                  allItem[i].charge="无"; 
               } 
            }
        }
    }
    return allItem;
  }
 

  module.exports=Message;

  
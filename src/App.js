import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
let Message=require('./getItems.js');

function get_car_goods(barcode){//获取购物车里面的信息
  // let result=[];
  let count;
   $("#carList tr").each(function(i){
       let object=[];
       $(this).children('td').each(function(j){
           object.push($(this).text());
       });
       if(object[0]===barcode){
           count=object[5];
       }
   });
   return count;
}

function get_car_goods_Number(){//获取购物车中的商品编号
  let result=[];
  $("#carList tr").each(function(i){
    let object=[];
       $(this).children('td').each(function(j){
           object.push($(this).text());
       });
      if(Number(object[5])>1){
        var str="";
        str=object[0]+"-"+Number(object[5]);
        result.push(str);
      }else{
        result.push(object[0]);
      }
  });
  return result;
}
function getAllByID(barcode){
    let object={};
    let allItem=Message();
    allItem.filter(element=>{
        if(element.barcode===barcode){
            object.barcode=element.barcode;
            object.name=element.name;
            object.unit=element.unit;
            object.price=element.price;
            object.charge=element.charge;
            return object;
        }
    });
    return object;
}




class App extends Component{  
  lookCar(){
    $("#lookcar").click(function(){
      $("#car").show();
      $("#shop").hide();
    });
  }
  return(){
    $("#return").click(function(){
      $("#car").hide();
      $("#shop").show();
    })
  }
  buy(){
    $("#car").off().on('click','#buy',function(){
      let data=get_car_goods_Number();
    //   $.ajax({
    //     contentType: "application/json;charset=utf-8",
    //     url: "/api/charts",
    //     type: "post",
    //     data: data,
    //     success: function (data) {
    //         console.log(data);
    //     }
    // })
    console.log(data);
     
    })
  }
  handleClick(){
    $("#good_list").off().on("click", ".addButton", function(event){
     let barcode= $(this).parent().parent().children("td").first().html();
     let text=$(this).next().val();
     let goods=getAllByID(barcode);
  if(text==="请输入数量"){
      goods.count=1;
  }else{
      goods.count=text;
  }
   let count2=get_car_goods(barcode);
  if(count2===undefined){
  let str="<tr class='goods'><td>"+goods.barcode+"</td><td>"+goods.name+"</td> <td>"+goods.unit+"</td> <td>"+goods.price+"</td><td>"+goods.charge+"</td><td class='count'>"+goods.count+"</td></tr>";
  $("#carList").append(str);
  }else{
      $("#carList tr").each(function(i){
          $(this).children('td').each(function(j){
              if($(this).text()===barcode){
                  $(this).parent().children(".count").html(Number(count2)+Number(goods.count));
              }
          });
      });     
  }
  });
  }
  onCharge(){
    $(".cartext").click(function(){
      $(this).val(" ");
    })
  }
  
  render() {  
    return (   
      <div>
     <div id="shop">  
       <h1>购物商城</h1>
        <table className='shoptabel' border="2">  
          <thead className='theads' onClick={this.sort}>  
            <tr>  
              {  
               this.props.headers.map((head,index)=>  
                <th key={index}>{head}</th> )   
              }  
            </tr>  
          </thead>  
          <tbody id="good_list">  
            {
              this.props.data.map((row,index)=>{ 
                return (<tr>  
              <td>{row.barcode}</td> <td>{row.name}</td> <td>{row.unit}</td> <td>{row.price}</td> <td>{row.charge}</td> 
              <td width="30%"><button className="addButton" onClick={this.handleClick} >加入购物车</button>&nbsp;&nbsp; <input className="cartext" defaultValue="请输入数量" onClick={this.onCharge}/></td> 
                 </tr>  
                  )  
              })                
            }  
          </tbody>  
        </table> 
        <button id="lookcar" onClick={this.lookCar}>查看购物车</button> 
     </div> 
     <div id="car">
     <h1>购物车</h1>
     <table id="cartable"  border="1">
     <thead className='theads' onClick={this.sort}>  
            <tr>  
              <td>编号</td><td>名称</td><td>规格</td><td>价格</td><td>优惠信息</td><td>数量</td>
            </tr>  
            </thead>
            <tbody id="carList">  
           
          </tbody>    
     </table>
     <button id="return" onClick={this.return}>返回购物商城</button><button id="buy" onClick={this.buy}>购买</button>
     </div> 
     </div>
    );  
  }  
}  


export default App;

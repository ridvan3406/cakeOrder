"use strict";
const patisserie = {
  bananaCaramel: {
    stock:3,
    price: 9.99,
  },
  contessa: {
    stock: 5,
    price: 7.99,
  },
  concorde: {
    stock: 11,
    price: 22.99,
  },
  mouseCake: {
    stock: 8,
    price: 16.99,
  },
  confettiSuprise: {
    stock: 9,
    price: 14.99,
  },
};
const checkOrder = (order,num) => {
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(patisserie[order]['stock']>num){
          let totalPayment = patisserie[order]['price']*num
          console.log(`yeterli urun stokta var. Toplam ucret ${totalPayment}`)
          resolve(totalPayment);
        }else{
          reject('yeterli urun stokta yok')
        }
      },1000)
    })
};
const payment = (totalPayment,order,num) => {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log(`Toplam ucret ${totalPayment}. odemeyi gerceklestirmek istiyorsaniz 1'e ,iptal etmek istiyorsaniz herhangi bir tusa basiniz`)
        document.addEventListener('keypress',(e)=>{
          if(e.key === '1'){
            let remain =patisserie[order]['stock']-=num
            console.log('odeme basariyla gerceklestirildi');
            resolve(remain)
          }else{
            reject('isleminiz iptal edildi')
          }
        })
    },2000)
  })
}
const stockControl = (stock) => {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(stock>=2){
        resolve(`stokta ${stock} tane urun var`)
      }else{
        reject('dikkat!!!! stokta urun bitmek uzere. lutfen urunleri guncelleyin')
      }
    },3000)
  })
}
const handleSuccess = (resolvedValue) => {
  console.log(resolvedValue)
}
const handleFailure = (rejectionReason) => {
  console.log(rejectionReason)
}
var selection = document.getElementById('cakeSelect');
var amount = document.getElementById('cakeAmount');
var orderBtn = document.getElementById('submit_btn');

orderBtn.onclick = ()=>{
  console.log(`you ordered ${amount.value} ${selection.value}`)
  checkOrder(selection.value, amount.value)
  .then((resolvedValueFromCheckOrder)=>{
    console.log(resolvedValueFromCheckOrder)
    return payment(resolvedValueFromCheckOrder,selection.value,amount.value)
  })
  .then((resolvedValueFromPayment)=>{
    // console.log(resolvedValueFromPayment)
    return stockControl(resolvedValueFromPayment)
  }) 
  .then((resolvedValue) => {
    console.log(resolvedValue)
  })
  .catch(handleFailure)
}
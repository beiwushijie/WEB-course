var data = {
    name: "张三",
    age: 25,
    email: "zhangsan@example.com"
};
$(function(){
    $("button").click(function(){
        $.post("http://0.0.0.0:8000/files",JSON.stringify(data),function(data,status){
            // $("#display").val("数据: " + data + "\n状态: " + status);
            console.log("数据: " + data + "\n状态: " + status);
        });
      });
})


console.log("数据");
	$.ajax({
	    url : "pages/bussanalysis/second.json",
	    type : "get",
	    async : false,
	    dataType:"json",
	    error : function() {
	        alert("error!");
	    },
	    success : function(data) {
	    	
	    	//中国地图 
	        var mapData=data["middle_map"].datas;
	        ChinaFactory('middle_map',mapData);
	        
	        //生成折线图和柱形图的混合图
	        
	        var barandpieData=data["barandpie"].datas;
	          
	          var datax=new Array();
	          var datay=new Array();
	          var dataz=new Array();
	          
	          for(var i=0;i<barandpieData.length;i++){
	        	  
	        	    datax.push(barandpieData[i].xValue);
	        	    datay.push(barandpieData[i].yValue);
	        	    dataz.push(barandpieData[i].zValue);
	          }
	        
	          
	          var paramsData={
	        	     xdata:datax,
	        	     ydata:datay,
	        	     zdata:dataz
	        	
	          }
	      	barAndPie("barandpie",paramsData);
   
	    	
	        //底部柱形图生成  json 包含有x轴数据和items的数据     
	         var x1=new Array();
	     	 var y1=new Array();
	     	
	       for(var i=0;i<data.bottom_main.length;i++){
	     		
	     	   x1.push(data.bottom_main[i]['name']);
	     	   y1.push(data.bottom_main[i]['value']);
	     	   
	     	}  	 
	     	var json={		
	     		xdata:x1,
	     		ydata:y1
	     	}
	         
			  ChartFactory("bottom_main",json)   
	       //生成右下角的条行图
		   var barData=data["bottom_bar"];
	        var xArr=[];
	        var yArr=[];
	        
	       for(var i=0;i<barData.length;i++){
	      
	      	 xArr.push(barData[i].value);
	      	 yArr.push(barData[i].name);
	       }
	        var right_bar_json={
	  		 "x":xArr,
	  		 "y":yArr
	      }
	        
             mypie("bottom_bar",right_bar_json);
	        
	        //生成环形图	        
	        var cright_circle_json=data.datas.items;
	        mycircle("cright_circle",cright_circle_json);
	        
	       //生成饼图
	       
	       //pieFactory("mypie",data)         
	   	   //男女比例小图标
	        var personMSG=data["person-msg"];
	        count("nv_content", personMSG["nv_span"]);
	   	    count("nan_content",personMSG["nan_span"]); 
	   	   //总体收入分析
	   	   
	   	 var ullist=data["content-title-ul"];
        
       $("#user-normal").find("p").text(ullist["user-normal"].text).next().text(ullist["user-normal"]["span"]);
       $("#nation-users").find("p").text(ullist["nation-users"].text).next().text(ullist["nation-users"]["span"]);
       $("#users-active").find("p").text(ullist["users-active"].text).next().text(ullist["users-active"]["span"]);
       $("#nation-users-increase").find("p").text(ullist["nation-users-increase"].text).next().text(ullist["nation-users-increase"]["span"]);
       $("#user-slient").find("p").text(ullist["user-slient"].text).next().text(ullist["user-slient"]["span"]);
        //底部柱形图生成
     /*    data : ['12','13','14','18','19','20','08','09','10','11']  
 
           data:['220','180','160','133','120','110','84','78','74','60']   */
           
            var rightbar_datax=new Array();
            var rightbar_datay=new Array();
        
  
	   	    for(var i=0;i<data.right_bar.length;i++){
	   	    	rightbar_datax.push(data.right_bar[i].name);
	   	    	rightbar_datay.push(data.right_bar[i].value);
	   	     }
	   	    
	   	    var  rightbar_json = {
	   	    		datax:rightbar_datax,
	   	    		datay:rightbar_datay		
	   	    }
	     	 rightbar("right_bar",rightbar_json);
	       }
	    })
	
     function ChartFactory(id,params){
	     var myChart = echarts.init(document.getElementById(id));
 
	   var option = {  
        tooltip: {          //聚焦触发的效果，详情可参见。全局设置  
            trigger: 'axis',  
            axisPointer: {  
                type: 'cross',  
                crossStyle: {  
                    color: '#f8f1ff' 
                }  
            }  
        },  
       
        legend: {           //图表图例注释  
            right: '10%' ,  
            //data:['降水量','蒸发量','温度']  
        },  
        xAxis: [        //x轴属性设置，需要详细了解该模块属性配置，可参见https://echarts.baidu.com/option.html#xAxis  
            {   
			    show:true,
				 axisLine:{                  //表示坐标轴是否显示  
                  show: false 
                },  
				 axisTick:{
				  show:false
				 },
				  axisLabel: {
                              show: true,
                              textStyle: {
								  fontSize:12,
								  color:'#fff',
								  fontWeight:900
                              }
                          },
                type: 'category',           //表示类型为科目类  
                data:params.xdata       //坐标轴的值  
            }  
        ],  
        yAxis: [                            //（可以有多个坐标轴），数组中的对象位置决定了yAxisIndex的值（yAxisIndex会在series中用到）  
            {   
			    show:false,
                type: 'value',              //表示属性为value类  
                name: '降水',                 //坐标轴名称  
                minInterval: 1,             //坐标最小划分单位，设置为1表示坐标轴节点保留整数  
                splitNumber: 4,             //指定坐标轴节点分割数（非强制），会按照预算自行调整最合适的分割数  
                axisLine:{                  //表示坐标轴是否显示  
                  show: false 
                },  
                splitLine: {                //表示分割线属性设置  
                    lineStyle: {            //表示分割线的样式  
                        type: 'dashed'         //虚线  
                    }  
                },  
                axisLabel: {  
                    formatter: '{value} ml'     //表示所有值得单位  
                }  
            },  
       
        ],  
        series: [           //坐标轴实际数据内容  
            {  
                name:'降水量',             //数据名称  
                type:'bar',                 //数据表现形式（bar为柱形图，line为折线图）  
                barWidth:'50%', 
				 
				//柱形图宽度  
                itemStyle:{                 //柱子的属性设置  
                    normal:{  
                        color: '#33ccff',   //柱子的颜色设置  
						  barBorderRadius:[3,3,3,3]
                    }  
                },  
                data:params.ydata,  //该条数据对应一条记录 
				label:{
          				    normal:{
          					    show:true,
          						position:'top',
                                formatter:'{c}万',
								fontSize:12,
								color:'#f6fdff',
								fontWeight:500

          					}
          			}
            },  

		
          
        ],  
        grid: {             //设置网格属性  
            left:'2%',     //网格距离容器左侧的距离  
            right:'2%', 
			top:'26%',
			bottom:'26%',//网格距离容器右侧的距离  
            borderWidth:1 
        }  
    };  

	 myChart.setOption(option);
	 
	}

	//生成饼图
	        
	  function pieFactory(id,params) {
		var chart = document.getElementById(id);

		var myChart = echarts.init(chart);

		var option = {

			tooltip : { //提示框组件
				show : true,
				formatter : "{a} <br/>{b} : {c} ({d}%)" //正则设置格式
			},
			color : [ "#2998e4", "#48ca6b", "#37eee7" ],
			legend : { //图例组件
				orient : 'vertical', //图例的布局朝向
				right : '0%', //图例的位置--离左边的距离
				top : '46%', //图例的位置--离上边的距离
				itemGap : 6, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
				data : [params.items[0].name,params.items[1].name, params.items[2].name],
				textStyle : {
					color : '#f6fdff',
					fontSize : 12
				}
			},
			series : [ {
				name : '年龄分布',
				type : 'pie',
				radius : [ 0, 70 ],
				center : [ '30%', '55%' ],

				data : [ {
					value :params.items[0].value,
					name : params.items[0].name,
					icon : params.items[0].icon,
					itemStyle : {
						normal : {
							borderWidth : 10,

						}
					}
				}, {
					value :params.items[1].value,
					name : params.items[1].name,
					icon : params.items[1].icon,
				}, {
					value :params.items[2].value,
					name : params.items[2].name,
					icon : params.items[2].icon,
				},

				],
				roseType : 'angle',

				itemStyle : {
					emphasis : {
						shadowBlur : 200,
						shadowColor : 'rgba(0, 0, 0, 0.5)'
					},
					normal : {
						label : {
							show : true,
							formatter : '{b}:{c} ({d}%)'
						},
						labelLine : {
							show : true
						},

					}
				},
				label : {
					normal : {
						show : false,
						textStyle : {
							color : 'rgba(255, 255, 255, 0.3)'
						}
					}
				},
				labelLine : {
					normal : {
						lineStyle : {
							color : 'rgba(255, 255, 255, 0.3)'
						}
					}
				}

			} ],
			grid : { //设置网格属性  
				left : '0%', //网格距离容器左侧的距离  
				right : '0%', //网格距离容器右侧的距离  
				borderWidth : 1
			}
		}

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);

	}
	

  
	
 //生成右下角的条行图
     function mypie(id,params){
	    
	            var chart=document.getElementById(id);
	         
	           	var myChart = echarts.init(chart);
	            option = {
	                tooltip : {
	                     show: true,
	        			 trigger: 'axis',
	                     formatter: "{b}:{c}%",  //正则设置格式
	        			 axisPointer: { // 坐标轴指示器，坐标轴触发有效
	        				type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
	        		     	},
	                },
	                grid:{   //绘图区调整
	                    left:'25%',  //左留白
	                    top:'5%',   //上留白
	                    right:'0%',  //右留白
	                    bottom:"10%"   
	                },
	                xAxis : [
	                    {
	                        show:false,
	                        type : 'value',
	                        boundaryGap : ['0%', '80%'],
	                        position: 'top'
	                    }
	                ],
	                yAxis : [
	                    {
	                        type : 'category',
	                        data : params.y,
	        				barGap:10,
	                        axisLine:{show:false},     //坐标轴
	                        axisTick:[{    //坐标轴小标记
	                            show:false
	                        }],
	                        axisLabel:{
	                            textStyle:{
	                                fontSize:'14',
									color:"#f6fdff"
	                            }
	                        }
	                    }
	                ],
	                series : [
	                    {
	                        name:'数据：',
	                        type:'bar',
	                        tooltip:{show:true},
	           
	                        barWidth: '9', 
	                        
	                        data:params.x,
	        			
	                        itemStyle:{
	                            normal:{    //柱状图颜色
	                                color:'#13e274',
	                                label:{
	                                    show: true,   //显示文本
	                                    position: 'right',  //数据值位置
	        							formatter:'{c}万',
	                                    textStyle:{
	                                        color:'#f6fdff',
	                                        fontSize:'14px',
										    fontWeight:700
	                                    }
	                                },
	                  				   barBorderRadius:[0,2,2,0],
	              					   
	                            }
	                        }
	                    }
	                ]
	            };
	             
	              myChart.setOption(option);
	 
	 }
 //生成中国地图
       function ChinaFactory(id,params){

	          var chart=document.getElementById(id);
            	 
              var myChart = echarts.init(chart, 'shine');
            	        
             function randomData() {
                     return Math.round(Math.random()*1000);
                }
      
               option = {
               tooltip: {
                trigger: 'item'
               },
               
               series: [
                {
                  itemStyle: {
                   normal: {
                        color: '#5ca9e8',
                         borderWidth: .5,//区域边框宽度
                         borderColor: ' #5499ee',//区域边框颜色
                         areaColor:"#296dc1",//区域颜色
						 textStyle:{
						   fontSize:10
						 }
                      },
            		  emphasis:{
            		                   borderWidth: .5,
                                        borderColor: '#4b0082',
                                        areaColor:"#ffdead",
            		  }
                    },
                 name: '各省业务总收入',
                 type: 'map',
                 mapType: 'china',
                 roam: false,
                 label: {
                  normal: {
                   show: true,
            	  textStyle:{color:"#eee",
				     fontSize:10
					
				  }
                  },
                  emphasis: {
                   show: true,
            	   textStyle:{
            	     color:"red"
            	   }
                  }
                 },
                 data:params
                 
                }
               ]
              };
                 
                myChart.setOption(option); 
                
                myChart.on("click",function(param){
            	    var name=param.data.name;
            		var value=param.data.value;
            		console.log(param);
            		alert("选中的省会是："+name+"数值是："+value)
            	    
            	})
	 }

  //生成折线图和柱形图的混合图
      
  function  barAndPie(id,params){
    
	   var myChart = echarts.init(document.getElementById(id));

	option = { 
		tooltip : {  
			trigger: 'axis'  
		},  
    
    xAxis : [  
        {  
            type : 'category',  
            position: 'bottom',  
            boundaryGap: true,  
            axisLine : {    // 轴线  
                show: true,  
                lineStyle: {  
                  
                }  
            },  
            axisTick : {    // 轴标记  
                show:false,  
                length: 10,  
                lineStyle: {  
                    color: 'red',  
                    type: 'solid',  
                    width: 2  
                }  
            },  
            axisLabel : {  
                show:true,  
                interval: 'auto',    // {number}  
                margin: 3,  
                textStyle: {  
                    color: '#f6fdff',  
                    fontSize: 10,  
                    fontWeight: 'bold'  
                }  
            },  
           
   
            data :params.xdata
       },  
    ],  
    yAxis : [  
        {  
            type : 'value',  
			  splitNumber: 2,  
            position: 'left',  
         
            boundaryGap: [0,1],  
            axisLine : {    // 轴线  
                show: true,  
                lineStyle: {  
                     background:'#43535b'
                }  
            },  
            axisTick : {    // 轴标记  
                show:false,  
		
                length: 0,  
                lineStyle: {  
                    color: 'green',  
                    type: 'solid',  
                    width: 0 
                }  
            },  
			  splitLine : {  
                show: false  
            } ,
            axisLabel : {  
                show:true,  
                interval: 'auto',  
                margin: 4,  
                formatter: '{value}',    
                textStyle: {  
                    color: '#f6fdff',  
                    fontSize: 10,  
                    fontStyle: 'normal',  
                    fontWeight: 'bold'  
                }  
            },  
        },  
        {  
            type : 'value',  
            splitNumber: 2,  
            axisLabel : {  
                formatter: function (value) {  

                    return value ;
                }  
            },  
			    axisTick : {   
                show:false,  
		
                length: 0,  
                lineStyle: {  
                    color: 'green',  
                    type: 'solid',  
                    width: 0 
                }  
            },  
            splitLine : {  
                show: false  
            },
			     axisLabel : {  
                show:true,  
                interval: 'auto',  
                margin: 4,  
                formatter: '{value}',    
                textStyle: {  
                    color: '#f6fdff',  
                    fontSize: 10,  
                    fontStyle: 'normal',  
                    fontWeight: 'bold'  
                }  
            }
        }  
    ],  
    series : [  
        {  
            name: '收入(千万)',  
            type: 'bar',  
			barWidth:25,
            itemStyle:{  
                    normal:{  
                        color:"#4ad8e7"  
                    }  
            },  
		    label:{
          				    normal:{
          					    show:true,
          						position:'top',
                         
								fontSize:10,
								color:'#f6fdff',
								fontWeight:500

          					}
          			},
            data:params.ydata 
        },  
        {  
            name: '增长率',  
            type: 'line',  
            yAxisIndex: 1,  
            itemStyle:{  
                    normal:{  
                        color:"#e27226"  
                    }  
            },  
           
		    label:{
          				    normal:{
          					    show:true,
          						position:'top',
                                formatter:'{c}%',
								fontSize:10,
								color:'#e27226',
								fontWeight:500

          					}
          			},
            
            data: params.zdata
        },  
    ],
	 grid: {             //设置网格属性  
            left:'12%',     //网格距离容器左侧的距离  
            right:'12%', 
			top:'10%',
			bottom:'10%',//网格距离容器右侧的距离  
            borderWidth:1 
        }  
};  
                       
myChart.setOption(option);  

	   
		 
}
    //生成男女小人比例 
 
  function count(id,score){

           var per=document.getElementById(id);
           var con=per.nextElementSibling;
		 
		   con.children[0].innerText=score;     	  	 
		   
		     
		   score=parseInt(score);
		   score=score/10;
		   
	       if(score%2==0){
		     var target=(10-score)*2;
			 target=target*20*-1+"px";
         
		     per.style.backgroundPosition='0  '+target+'';
		      
		     
		     
		 }else{
		     
			  score=score*2;
		    var target=20-Math.round(score);

			
			 target=target*20*-1+"px";
		     per.style.backgroundPosition='0  '+target+'';
		     
		    
		   
		 }
	   }
        
		 
	 //生成各类用户环形图   
         function mycircle(id,params){
		      var myChart = echarts.init(document.getElementById(id));
        // 指定图表的配置项和数据
        var option = {
		
            tooltip : { //提示框组件
                trigger: 'item', //触发类型(饼状图片就是用这个)
                formatter: "{a} <br/>{b} : {c} ({d}%)" //提示框浮层内容格式器
             },
             color:['#3ea2e9','#a354de','#557886'],  //手动设置每个图例的颜色
             legend: {  //图例组件
                //right:100,  //图例组件离右边的距离
                orient : 'horizontal',  //布局  纵向布局 图例标记居文字的左边 vertical则反之
                width:40,      //图行例组件的宽度,默认自适应
                x : '200',   //图例显示在右边
                y: 'center',   //图例在垂直方向上面显示居中
                itemWidth:10,  //图例标记的图形宽度
                itemHeight:10, //图例标记的图形高度
                data:['活跃用户','沉默用户','一般用户'],
                textStyle:{    //图例文字的样式
                    color:'#f6fdff',  //文字颜色
                    fontSize:12    //文字大小
                }
            },
           series : [ //系列列表
                {
                    name:'活跃用户',  //系列名称
                    type:'pie',   //类型 pie表示饼图
                    center:['25%','50%'], //设置饼的原心坐标 不设置就会默认在中心的位置
                    radius : ['10', '18'],  //饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是真的饼,不是环形
                    itemStyle : {  //图形样式
                        normal : { //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                            label : {  //饼图图形上的文本标签
                                show : false , //平常不显示
								formatter:'{b} \n({d}%)',
								textStyle:{
								   fontSize:'15'
								}

                            },
                            labelLine : {     //标签的视觉引导线样式
                                show : false //平常不显示
                            }
                        },
                        emphasis : {   //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                            label : {  //饼图图形上的文本标签
                                show : true,
                                position : 'center',
                                textStyle : {
                                    fontSize : '10',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:params
                },
				   {
                    name:'一般用户',  //系列名称
                    type:'pie',   //类型 pie表示饼图
                    center:['25%','50%'], //设置饼的原心坐标 不设置就会默认在中心的位置
                    radius : ['28', '36'],  //饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是真的饼,不是环形
                    itemStyle : {  //图形样式
                        normal : { //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                            label : {  //饼图图形上的文本标签
                                show : false , //平常不显示
								formatter:'{b} \n({d}%)',
								textStyle:{
								   fontSize:'15'
								}

                            },
                            labelLine : {     //标签的视觉引导线样式
                                show : false //平常不显示
                            }
                        },
                        emphasis : {   //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                            label : {  //饼图图形上的文本标签
                                show : true,
                                position : 'center',
                                textStyle : {
                                    fontSize : '10',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:params
                },
				   {
                    name:'沉默用户',  //系列名称
                    type:'pie',   //类型 pie表示饼图
                    center:['25%','50%'], //设置饼的原心坐标 不设置就会默认在中心的位置
                    radius : ['45', '53'],  //饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是真的饼,不是环形
                    itemStyle : {  //图形样式
                        normal : { //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                            label : {  //饼图图形上的文本标签
                                show : false , //平常不显示
								formatter:'{b} \n({d}%)',
								textStyle:{
								   fontSize:'15'
								}

                            },
                            labelLine : {     //标签的视觉引导线样式
                                show : false //平常不显示
                            }
                        },
                        emphasis : {   //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                            label : {  //饼图图形上的文本标签
                                show : true,
                                position : 'center',
                                textStyle : {
                                    fontSize : '10',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:params
                }
            ]
        }
        myChart.setOption(option);
		 
		 }
       //生成底部右边的柱状图
       function  rightbar(id,params){
     var myChart = echarts.init(document.getElementById(id));

		option = { 
		tooltip : {  
			trigger: 'axis'  
		},  
    
    xAxis : [  
        {  
            type : 'category',  
            position: 'bottom',  
            boundaryGap: true,  
            axisLine : {    // 轴线  
                show: false,  
                lineStyle: {  
                  
                }  
            },  
            axisTick : {    // 轴标记  
                show:false,  
                length: 10,  
                lineStyle: {  
                    color: 'red',  
                    type: 'solid',  
                    width: 2  
                }  
            },  
            axisLabel : {  
                show:true,  
                interval: 'auto',    // {number}  
                margin: 3,  
                textStyle: {  
                    color: '#f6fdff',  
                    fontSize: 10,  
                    fontWeight: 'bold'  
                }  
            },  
           
   
            data : params.datax
       },  
    ],  
    yAxis : [  
        {  
            type : 'value',  
            position: 'left',  
            splitNumber:4,
            boundaryGap: [0,0.1],  
            axisLine : {    // 轴线  
                show: false,  
                lineStyle: {  
                     background:'#43535b'
                }  
            },  
            axisTick : {    // 轴标记  
                show:false,  
		
                length: 0,  
                lineStyle: {  
                    color: 'green',  
                    type: 'solid',  
                    width: 0 
                }  
            },  
			  splitLine : {  
                show: true  
            } ,
            axisLabel : {  
                show:true,  
                interval: 'auto',  
                margin: 4,  
                formatter: '{value}千',    
                textStyle: {  
                    color: '#f6fdff',  
                    fontSize: 10,  
                    fontStyle: 'normal',  
                    fontWeight: 'bold'  
                }  
            },  
        },  
       
    ],  
    series : [  
        {  
            name: '收入(千万)',  
            type: 'bar',  
			barWidth:15,
            itemStyle:{  
                    normal:{  
                        color:"#4ad8e7"  
                    }  
            },  
		    label:{
          				    normal:{
          					    show:false,
          						position:'top',
                         
								fontSize:10,
								color:'#f6fdff',
								fontWeight:500

          					}
          			},
            data: params.datay
        }
        
            
       
    ],
	 grid: {             //设置网格属性  
            left:'12%',     //网格距离容器左侧的距离  
            right:'12%', 
			top:'10%',
			bottom:'10%',//网格距离容器右侧的距离  
            borderWidth:1 
        }  
};  
                       
myChart.setOption(option);  

	   
		 
}

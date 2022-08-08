App
    Form
    List
        Task
Task component'i done button'u sonrasi done edildiginde done ve done-anim className state guncellemesi geliyor ancak bu islem sonrasi List component'inde remaining task degeri de guncellenmeli.

once Task'i render ediyorum Task.setIsDone(true) sonra
List'i re-render ediyorum List.setForceRender(..anim:false) 

ayni durum doneAll butonu icin de gecerli.



soyle olabilirdi
Task component olmak yerine direk list icerisinde olabilirdi

ya da

remaining left farkli bir comoponent mi olmaliyidi?
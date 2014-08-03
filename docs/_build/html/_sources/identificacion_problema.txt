Identificación del problema
======================================

Los modelos de inventario son modelos de almacenamiento. La simulación de un sistema de 
inventario representan situaciones en las que se tiene una determinada mercancía almacenada 
y se observa su comportamiento de acuerdo a una serie de demandas y compras de la misma. 
Se pueden utilizar para comparar distintas políticas de reabastecimiento para el sistema de 
inventario y seleccionar la que ofrezca la mejor relación servicio/costo. 

Suponemos un almacén, con un producto. Pueden realizarse pedidos de dicho producto a 
ciertos proveedores y hay clientes que llegan a comprarlos al almacén. Se debe poder decidir 
cuántos ítems de producto tener en el inventario en cada uno de los próximos n periodos. 
De acuerdo a la política de reabastecimiento se revisa el nivel del inventario y se decide 
cuántos ítems hay que pedir. 

La política de reabastecimiento del almacén responde basicamente dos preguntas:

- ¿Cuando pedir? 
- ¿Cuanto pedir?

Si es posible conocer el nivel de inventario en tiempo real, la aplicación ofrece la política 
de reabastecimiento (Q,s). Si el nivel almacenado es inferior o igual a un punto de reorden "s", 
se piden "Q" unidades.

Si solo se pueden hacer verificaciones del inventario cada cierto periodo de tiempo, esta 
disponible la política (R,S). Cada "R" periodos se revisa el nivel de inventario, si el nivel 
almacenado es superior a "S" no se realiza petición, si no es así se pedirá hasta llegar a "S".
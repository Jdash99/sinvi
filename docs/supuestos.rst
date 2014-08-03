Supuestos
=========

Solo hay un producto disponible con las siguientes caracteristicas que pueden ser editadas dentro
del código:

- Se inicia con un inventario de 24000 unidades. 
- La demanda es aleatoria y se conoce su distribución de probabilidad. La distribución es normal con media: 8000 y desviación estandar 1000. En otras palabras la demanda por periodo estará mas o menos entre 6000 y 10000 unidades por periodo.
- El lead time es aleatorio y se conoce su distribución de probabilidad. La distribución es triangular con min 0 moda 1 y max 2. Es decir, estará entre 0 y 2, con mayor probabilidad de ser 1.
- El precio del producto es de 8 $/und.

En el momento que un cliente realiza una demanda al almacén, se satisface inmediatamente si el 
tamaño del inventario es igual o mayor que la demanda hecha. Si la demanda excede el nivel de 
inventario, la parte que no puede ser entregada será asumida como una venta perdida. 

Cuando el almacén realiza un pedido a sus proveedores, la orden no es servida inmediatamente 
sino que pasa un tiempo hasta que el producto se recibe. A este tiempo que transcurre entre 
el momento que se realiza la orden y el instante en que se recibe, se le conoce como "lead time".

Al momento de realizar los pedidos se hace en función de la posición de inventario y no del 
nivel de inventario. Esto porque la posición de inventario captura el inventario a la mano y el 
que está por llegar, de esta forma se evita la tendencia de subestimar o exceder la cantidad pedida.

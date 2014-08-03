=========
SinVi
=========

Resumen
========

:Nombre: Sinvi
:Documentacion: 
:Autor: Javier Cárdenas <jdash99@gmail.com>
:Version: 0.0.1

SinVi es una pequeña aplicación web para la simulación de políticas de inventario.

Como usar?
==========

Ir al demo en:

http://sinvi-app.herokuapp.com/

O puedes clonar este repo y ejecutar:
::
	git clone git://github.com/Jdash99/sinvi.git
	cd sinvi
	sudo pip install -r requirements.txt
	python views.py runserver
	* Running on http://localhost:5000/

# TODO

- Permitir al usuario crear productos con diferentes distribuciones de demanda y lead time.
- Agregar más políticas (Ss, RSs)
- Mejorar los tests
- Mostrar un resumen de los costos incurridos en la política seleccionada

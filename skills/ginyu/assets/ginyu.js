(function ($) {
    'use strict';

    if (!$) return;

    $.fn.ginyuProtegerScrollbars = function () {
        return this.each(function () {
            var $grid = $(this);

            function aislar() {
                $grid.find('.jqx-scrollbar')
                    .off('mousedown.gyu pointerdown.gyu click.gyu')
                    .on('mousedown.gyu pointerdown.gyu click.gyu', function (e) {
                        e.stopPropagation();
                    });
            }

            aislar();
            $grid.off('bindingcomplete.gyuScroll').on('bindingcomplete.gyuScroll', aislar);
        });
    };

    $.ajaxPrefilter(function (options) {
        if (!options.loader) return;

        var $btn = $(options.loader);
        if (!$btn.length) return;

        var spinner = options.spinner !== false;
        var textoCargando = options.textoCargando || 'Guardando...';

        function liberar() {
            $btn.data('gyuEnviando', false).prop('disabled', false);
            if (spinner && $btn.data('gyuHtml') != null) {
                $btn.html($btn.data('gyuHtml'));
            }
        }

        if ($btn.data('gyuEnviando')) {
            options.success = options.error = options.complete = $.noop;
            options.beforeSend = function () { return false; };
            return;
        }

        $btn.data('gyuEnviando', true).prop('disabled', true);
        if (spinner) {
            $btn.data('gyuHtml', $btn.html());
            $btn.html("<i class='fa fa-spinner fa-pulse'></i> <span>" + textoCargando + "</span>");
        }

        var successOrig = options.success;
        var errorOrig = options.error;

        options.success = function (resp) {
            var data = resp;
            if (typeof data === 'string') {
                try { data = JSON.parse(data); } catch (e) {}
            }
            var esError = data && (data.success === false || data.success === 'false' || data.status === false);
            if (esError || options.liberarEnExito) {
                liberar();
            }
            if (successOrig) successOrig.apply(this, arguments);
        };

        options.error = function () {
            liberar();
            if (errorOrig) errorOrig.apply(this, arguments);
        };
    });

    var ICONO_VACIO =
        '<svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<rect width="73.4553" height="73.4553" rx="18" fill="#F1F3F5"/>' +
            '<path d="M49.2506 34.5853C49.2506 35.0926 49.049 35.5791 48.6903 35.9379C48.3315 36.2966 47.845 36.4982 47.3377 36.4982H26.9334C26.4261 36.4982 25.9395 36.2966 25.5808 35.9379C25.222 35.5791 25.0205 35.0926 25.0205 34.5853C25.0205 34.0779 25.222 33.5914 25.5808 33.2326C25.9395 32.8739 26.4261 32.6724 26.9334 32.6724H47.3377C47.845 32.6724 48.3315 32.8739 48.6903 33.2326C49.049 33.5914 49.2506 34.0779 49.2506 34.5853Z" fill="#7A8493"/>' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M17.5893 27.6638L20.6194 19.3796C20.9949 18.3553 21.6418 17.4523 22.4909 16.7672C23.34 16.0821 24.3593 15.6407 25.4399 15.4901C33.1159 14.4249 40.9023 14.4249 48.5783 15.4901C50.7819 15.7961 52.6336 17.2933 53.3988 19.3796L56.4314 27.6638C56.9976 28.5488 57.3878 29.5588 57.5536 30.6479L57.8112 32.3797C58.8303 39.1604 58.7355 46.0619 57.5307 52.812C57.2701 54.2685 56.5413 55.6002 55.4549 56.6047C54.3685 57.6091 52.9838 58.2315 51.5114 58.3773L48.3742 58.6884C40.8161 59.4406 33.202 59.4406 25.6439 58.6884L22.5068 58.3773C21.0343 58.2315 19.6497 57.6091 18.5633 56.6047C17.4769 55.6002 16.748 54.2685 16.4875 52.812C15.2827 46.0619 15.1879 39.1604 16.2069 32.3797L16.4671 30.6504C16.6271 29.5871 17.0095 28.5694 17.5893 27.6638ZM25.9653 19.2802C33.293 18.26 40.7252 18.26 48.0529 19.2802C48.4456 19.3356 48.816 19.4966 49.1246 19.7458C49.4331 19.9951 49.6683 20.3234 49.8051 20.6957L51.0957 24.2231L50.7462 24.1797L48.2518 23.9323C40.7751 23.1897 33.2431 23.1897 25.7663 23.9323L23.2719 24.1797C23.1529 24.1899 23.0364 24.2044 22.9225 24.2231L24.2131 20.6957C24.3498 20.3234 24.585 19.9951 24.8936 19.7458C25.2021 19.4966 25.5725 19.3356 25.9653 19.2802ZM20.905 29.5843L20.9509 29.6022L21.0096 29.4415C21.637 28.6355 22.5782 28.0897 23.6494 27.9851L26.1438 27.7377C33.3695 27.0183 40.6487 27.0183 47.8743 27.7377L50.3688 27.9851C51.44 28.0897 52.3811 28.6355 53.0086 29.4389L53.0672 29.6022L53.1131 29.5843C53.4554 30.0701 53.6799 30.629 53.7686 31.2167L54.0288 32.9459C54.9852 39.3146 54.896 45.7955 53.7635 52.1361C53.6501 52.7724 53.3323 53.3542 52.8581 53.7934C52.384 54.2325 51.7795 54.5049 51.1365 54.5693L47.9968 54.8805C40.6895 55.6048 33.3312 55.6048 26.0214 54.8805L22.8842 54.5693C22.2407 54.5055 21.6357 54.2333 21.161 53.7941C20.6864 53.3549 20.3681 52.7727 20.2546 52.1361C19.1225 45.7964 19.0329 39.3145 19.9894 32.9459L20.2495 31.2167C20.3383 30.629 20.5627 30.0701 20.905 29.5843Z" fill="#7A8493"/>' +
        '</svg>';

    $.fn.ginyuEmptyState = function (options) {
        options = options || {};
        var titulo = options.titulo || 'No hay datos para mostrar';
        var subtitulo = options.subtitulo || 'Aún no se han asignado datos.';
        var badgeSelector = options.badge || null;
        var cardInfoSelector = options.cardInfo || null;
        var estiloTop = options.top != null ? ' style="--gyu-vacio-top:' + options.top + 'px;"' : '';

        return this.each(function () {
            var $grid = $(this);
            var $parent = $grid.parent();

            if ($parent.css('position') === 'static') {
                $parent.css('position', 'relative');
            }

            var $vacio = $parent.find('.gyu-vacio');
            if (!$vacio.length) {
                $vacio = $(
                    '<div class="gyu-vacio"' + estiloTop + '>' +
                        ICONO_VACIO +
                        '<div class="gyu-vacio-titulo">' + titulo + '</div>' +
                        '<div class="gyu-vacio-desc">' + subtitulo + '</div>' +
                    '</div>'
                );
                $parent.append($vacio);
            }

            function verificar() {
                var total = 0;
                try {
                    var info = $grid.jqxGrid('getdatainformation');
                    total = info ? info.rowscount : 0;
                } catch (e) {}

                if (badgeSelector) {
                    $(badgeSelector).text(total);
                }

                var filas = null;
                try {
                    filas = $grid.jqxGrid('getrows');
                } catch (e) {}

                var vacio = !filas || filas.length === 0;
                $vacio.css('display', vacio ? 'flex' : 'none');
                if (cardInfoSelector) {
                    $(cardInfoSelector).toggle(vacio);
                }
            }

            $grid.data('gyuVerificarVacio', verificar);

            $grid.off('bindingcomplete.gyuVacio filter.gyuVacio')
                 .on('bindingcomplete.gyuVacio filter.gyuVacio', verificar);

            verificar();
        });
    };

    $.fn.ginyuActualizarEmptyState = function () {
        return this.each(function () {
            var fn = $(this).data('gyuVerificarVacio');
            if (typeof fn === 'function') fn();
        });
    };

    window.GinyuGrilla = {
        emptyState: function (gridSelector, options) {
            return $(gridSelector).ginyuEmptyState(options);
        },
        actualizar: function (gridSelector) {
            return $(gridSelector).ginyuActualizarEmptyState();
        }
    };

    $(function () {
        $('.gyu-grilla').ginyuProtegerScrollbars();
    });

    var contadorTabs = 0;

    window.GinyuTabs = {
        habilitar: function (tabsSelector) {
            var $tabs = $(tabsSelector);
            if (!$tabs.length) return;

            var $header = $tabs.find('.jqx-tabs-header');
            if (!$header.length) return;

            var $linea = $header.find('.gyu-tabs-linea');
            if (!$linea.length) {
                $linea = $('<div class="gyu-tabs-linea"></div>');
                $header.append($linea);
            }

            function seleccionado() {
                try { return $tabs.jqxTabs('selectedItem') || 0; } catch (e) { return 0; }
            }

            function moverLinea(index) {
                var $titulo = $header.find('.jqx-tabs-title').eq(typeof index === 'number' ? index : 0);
                if (!$titulo.length || !$titulo.is(':visible')) return;

                var pos = $titulo.position();
                if (!pos) return;

                var padIzq = parseFloat($titulo.css('padding-left')) || 0;
                var padDer = parseFloat($titulo.css('padding-right')) || 0;

                $linea.css({
                    left: (pos.left + padIzq) + 'px',
                    width: Math.max($titulo.outerWidth() - padIzq - padDer, 0) + 'px'
                });
            }

            setTimeout(function () { moverLinea(seleccionado()); }, 100);

            $tabs.on('selected', function (event) {
                if (!event || !event.args) return;

                var panel = $tabs.find('.jqx-tabs-content-element').eq(event.args.item);
                if (panel.length) {
                    panel.removeClass('gyu-fade-in');
                    void panel[0].offsetWidth;
                    panel.addClass('gyu-fade-in');
                }
                moverLinea(event.args.item);
            });

            $(window).on('resize.gyuTabs' + (++contadorTabs), function () {
                moverLinea(seleccionado());
            });
        }
    };

    $(document).on('mousedown', '.gyu-input[type="date"], .gyu-input[type="datetime-local"]', function (e) {
        var zona = 40;
        var rect = this.getBoundingClientRect();
        if (e.clientX < rect.right - zona) return;

        e.preventDefault();

        var $input = $(this);
        if ($input.data('gyuPickerAbierto')) {
            this.blur();
            $input.data('gyuPickerAbierto', false);
            return;
        }

        if (typeof this.showPicker === 'function') {
            try {
                this.showPicker();
                $input.data('gyuPickerAbierto', true);
            } catch (err) {}
        } else {
            this.focus();
        }
    });

    $(document).on('blur', '.gyu-input[type="date"], .gyu-input[type="datetime-local"]', function () {
        $(this).data('gyuPickerAbierto', false);
    });

    var ICONOS_DIALOGO = {
        eliminar:
            '<svg width="16" height="17" viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M1.25 8.58333H31.25M12.5 15.9167V26.9167M20 15.9167V26.9167M3.125 8.58333L5 30.5833C5 31.5558 5.39509 32.4884 6.09835 33.1761C6.80161 33.8637 7.75544 34.25 8.75 34.25H23.75C24.7446 34.25 25.6984 33.8637 26.4016 33.1761C27.1049 32.4884 27.5 31.5558 27.5 30.5833L29.375 8.58333M10.625 8.58333V3.08333C10.625 2.5971 10.8225 2.13079 11.1742 1.78697C11.5258 1.44315 12.0027 1.25 12.5 1.25H20C20.4973 1.25 20.9742 1.44315 21.3258 1.78697C21.6775 2.13079 21.875 2.5971 21.875 3.08333V8.58333" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>' +
            '</svg>',
        pregunta:
            '<svg viewBox="7 4.5 10 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:46px;height:46px;">' +
                '<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>' +
            '</svg>',
        info:
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:40px;height:40px;">' +
                '<circle cx="12" cy="12" r="10"></circle>' +
                '<line x1="12" y1="16" x2="12" y2="11"></line>' +
                '<circle cx="12" cy="7.5" r="0.75" fill="currentColor" stroke="none"></circle>' +
            '</svg>',
        error:
            '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<circle cx="18" cy="14" r="6" stroke="currentColor" stroke-width="3"></circle>' +
                '<path d="M8 34C8 28.4772 12.4772 24 18 24C23.5228 24 28 28.4772 28 34" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>' +
                '<path d="M32 16L44 28M44 16L32 28" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>' +
            '</svg>'
    };

    var BTN_CANCELAR = 'gyu-btn-outline gyu-theme-secondary gyu-btn-lg';

    function dialogo(cfg, options) {
        options = options || {};
        var title = options.title || cfg.title;
        var text = options.text != null ? options.text : cfg.text;

        if (typeof Swal === 'undefined') {
            console.error('SweetAlert2 no está cargado.');
            if (cfg.cancelar) {
                return Promise.resolve({ isConfirmed: window.confirm(title) });
            }
            window.alert(title + (text ? '\n' + text : ''));
            return Promise.resolve({ isConfirmed: true });
        }

        return Swal.fire({
            html: '<div class="gyu-dialogo-cuerpo">' +
                    '<div class="gyu-dialogo-icono ' + (cfg.iconoClase || '') + '">' + cfg.icono + '</div>' +
                    '<h3 class="gyu-dialogo-titulo">' + title + '</h3>' +
                    '<p class="gyu-dialogo-texto">' + text + '</p>' +
                '</div>',
            showCloseButton: true,
            showCancelButton: !!cfg.cancelar,
            reverseButtons: !!cfg.cancelar,
            confirmButtonText: options.confirmButtonText || cfg.confirmar,
            cancelButtonText: options.cancelButtonText || cfg.cancelarTexto,
            customClass: {
                container: 'gyu-dialogo-fondo',
                popup: 'gyu-dialogo',
                confirmButton: cfg.boton,
                cancelButton: BTN_CANCELAR,
                actions: 'gyu-dialogo-acciones' + (cfg.completo ? ' gyu-dialogo-acciones-completo' : ''),
                closeButton: 'gyu-dialogo-cerrar'
            },
            buttonsStyling: false
        });
    }

    window.Swalert = {
        confirmDelete: function (options) {
            return dialogo({
                title: 'Eliminar registro',
                text: 'Esta acción no se puede deshacer.<br>¿Deseas eliminar este registro?',
                icono: ICONOS_DIALOGO.eliminar,
                boton: 'gyu-btn-solid gyu-theme-danger gyu-btn-lg',
                confirmar: 'Eliminar',
                cancelar: true,
                cancelarTexto: 'Cancelar'
            }, options);
        },
        confirmInfo: function (options) {
            return dialogo({
                title: '¿Estás seguro?',
                text: '',
                icono: ICONOS_DIALOGO.pregunta,
                iconoClase: 'gyu-dialogo-icono-primary',
                boton: 'gyu-btn-solid gyu-btn-lg',
                confirmar: 'Sí',
                cancelar: true,
                cancelarTexto: 'No'
            }, options);
        },
        info: function (options) {
            return dialogo({
                title: 'Aviso',
                text: '',
                icono: ICONOS_DIALOGO.info,
                iconoClase: 'gyu-dialogo-icono-primary',
                boton: 'gyu-btn-solid gyu-btn-lg',
                confirmar: 'Aceptar'
            }, options);
        },
        error: function (options) {
            return dialogo({
                title: 'Ocurrió un error',
                text: '',
                icono: ICONOS_DIALOGO.error,
                boton: 'gyu-btn-solid gyu-theme-danger gyu-btn-lg',
                completo: true,
                confirmar: 'Cerrar'
            }, options);
        }
    };

    window.GinyuAlert = window.Swalert;

    if (typeof iziToast !== 'undefined') {
        iziToast.settings({
            position: 'bottomRight',
            progressBar: true
        });
    }

    function toast(metodo, clase, tituloDefecto, respaldo) {
        return function (msg, title) {
            title = title || tituloDefecto;
            if (typeof iziToast !== 'undefined') {
                var opciones = { title: title, message: msg };
                if (clase) opciones.class = clase;
                iziToast[metodo](opciones);
            } else if (typeof window.GinyuAlert !== 'undefined') {
                window.GinyuAlert[respaldo]({ title: title, text: msg });
            } else {
                window.alert(msg);
            }
        };
    }

    window.GinyuToast = {
        success: toast('success', 'gyu-toast-success', 'Éxito', 'info'),
        error: toast('error', 'gyu-toast-danger', 'Error', 'error'),
        warning: toast('warning', 'gyu-toast-warning', 'Atención', 'info'),
        info: toast('info', '', 'Aviso', 'info')
    };

    var seleccionUid = 0;

    $.fn.gyuSeleccion = function (options) {
        var cfg = $.extend({
            placeholder: 'Seleccionar...',
            textoTodos: 'Todos',
            textoSeleccionados: '{count} seleccionados',
            maxItemsRotulo: 2,
            buscadorPlaceholder: 'Buscar...',
            umbralBuscador: 7,
            ancho: ''
        }, options);

        return this.each(function () {
            var $select = $(this);
            if ($select.data('gyuSeleccion')) return;
            $select.data('gyuSeleccion', true);

            var multiple = cfg.multiple != null ? cfg.multiple : $select.prop('multiple');
            var respaldo = $select.attr('data-imagen-respaldo') || '';

            var $caja = $('<div class="gyu-seleccion"></div>');
            if (cfg.ancho) $caja.css({ width: cfg.ancho, flex: 'none' });
            $select.after($caja);
            $caja.append($select.hide());

            var $activador = $(
                '<button type="button" class="gyu-seleccion-activador">' +
                    '<span class="gyu-seleccion-rotulo"></span>' +
                    '<span class="gyu-seleccion-flecha"></span>' +
                '</button>'
            );
            var $rotulo = $activador.find('.gyu-seleccion-rotulo');
            var $desplegable = $('<div class="gyu-seleccion-desplegable"></div>');
            var $opciones = $('<div class="gyu-seleccion-opciones"></div>');
            $caja.append($activador, $desplegable);

            var lista = [];

            function imagen(url) {
                var $img = $('<img alt="" class="gyu-seleccion-escudo">').attr('src', url);
                if (respaldo) {
                    $img.on('error', function () {
                        if ($img.attr('src') !== respaldo) $img.attr('src', respaldo);
                    });
                }
                return $img;
            }

            function leerOpciones() {
                lista = [];
                $select.find('option').each(function () {
                    var $o = $(this);
                    var texto = $o.text().trim();
                    if (multiple && $o.prop('disabled') && (texto.toLowerCase() === 'todos' || $o.val() === '')) return;
                    lista.push({
                        valor: $o.val(),
                        texto: texto,
                        imagen: $o.attr('data-imagen') || '',
                        seleccionada: $o.prop('selected'),
                        deshabilitada: $o.prop('disabled'),
                        el: $o
                    });
                });
            }

            function actualizarRotulo() {
                var elegidas = lista.filter(function (o) { return o.seleccionada; });
                $activador.find('.gyu-seleccion-escudo').remove();

                if (!multiple && elegidas[0] && elegidas[0].imagen) {
                    $rotulo.before(imagen(elegidas[0].imagen));
                }

                var texto;
                if (!elegidas.length) {
                    texto = cfg.placeholder;
                } else if (!multiple) {
                    texto = elegidas[0].texto;
                } else if (elegidas.length === lista.length && lista.length > 1) {
                    texto = cfg.textoTodos;
                } else if (elegidas.length <= cfg.maxItemsRotulo) {
                    texto = elegidas.map(function (o) { return o.texto; }).join(', ');
                } else {
                    texto = cfg.textoSeleccionados.replace('{count}', elegidas.length);
                }
                $rotulo.text(texto).toggleClass('gyu-placeholder', !elegidas.length || (!multiple && elegidas[0].valor === ''));
            }

            var nsPosicion = '.gyuSeleccionPos' + (++seleccionUid);
            var vigilante = null;

            function posicionar() {
                var r = $activador[0].getBoundingClientRect();
                var vh = window.innerHeight;
                var $lista = $desplegable.find('.gyu-seleccion-opciones');

                $lista.css('max-height', '');
                $desplegable.css({ left: r.left, width: r.width, top: 'auto', bottom: 'auto' });

                var alto = $desplegable.outerHeight();
                var abajo = vh - r.bottom - 12;
                var arriba = r.top - 12;
                var sobre = alto > abajo && arriba > abajo;
                var disponible = sobre ? arriba : abajo;

                if (alto > disponible) {
                    var extra = alto - $lista.outerHeight();
                    $lista.css('max-height', Math.max(100, disponible - extra));
                }

                if (sobre) $desplegable.css('bottom', vh - r.top + 6);
                else $desplegable.css('top', r.bottom + 6);
            }

            function abrirPanel() {
                $desplegable.addClass('gyu-seleccion-flotante').appendTo(document.body);
                posicionar();
                $(window).on('resize' + nsPosicion, posicionar);
                window.addEventListener('scroll', alDesplazar, true);
                vigilante = setInterval(function () {
                    if (!$caja[0].isConnected || !$caja.is(':visible')) cerrar();
                }, 150);
            }

            function alDesplazar(e) {
                if ($desplegable[0].contains(e.target)) return;
                posicionar();
            }

            function cerrar() {
                $caja.removeClass('gyu-abierto');
                $(window).off(nsPosicion);
                window.removeEventListener('scroll', alDesplazar, true);
                clearInterval(vigilante);
                if ($desplegable.hasClass('gyu-seleccion-flotante')) {
                    $desplegable.removeClass('gyu-seleccion-flotante').css({ left: '', width: '', top: '', bottom: '' }).appendTo($caja);
                    $desplegable.find('.gyu-seleccion-opciones').css('max-height', '');
                }
            }

            function marcarTodas(valor) {
                $.each(lista, function (i, o) {
                    if (o.deshabilitada) return;
                    o.seleccionada = valor;
                    o.el.prop('selected', valor);
                });
                $opciones.find('.gyu-seleccion-opcion:not(.gyu-deshabilitado)').toggleClass('gyu-seleccionado', valor);
                actualizarRotulo();
                $select.trigger('change');
            }

            function dibujar() {
                $desplegable.empty();

                if (lista.length >= cfg.umbralBuscador) {
                    var $entrada = $('<input type="text" class="gyu-seleccion-busqueda-entrada">').attr('placeholder', cfg.buscadorPlaceholder);
                    $entrada.on('input', function () {
                        var q = $(this).val().toLowerCase().trim();
                        $opciones.find('.gyu-seleccion-opcion').each(function () {
                            $(this).toggle($(this).find('.gyu-seleccion-texto').text().toLowerCase().indexOf(q) !== -1);
                        });
                    });
                    $desplegable.append($('<div class="gyu-seleccion-busqueda"></div>').append($entrada));
                }

                if (multiple) {
                    var $todos = $('<button type="button" class="gyu-seleccion-accion"></button>').text(cfg.textoTodos);
                    var $limpiar = $('<button type="button" class="gyu-seleccion-accion gyu-seleccion-accion-limpiar">Limpiar</button>');
                    $todos.on('click', function (e) { e.preventDefault(); e.stopPropagation(); marcarTodas(true); });
                    $limpiar.on('click', function (e) { e.preventDefault(); e.stopPropagation(); marcarTodas(false); });
                    $desplegable.append($('<div class="gyu-seleccion-acciones"></div>').append($todos, $limpiar));
                }

                $opciones.empty();
                $.each(lista, function (i, o) {
                    var $item = $('<div class="gyu-seleccion-opcion"></div>')
                        .toggleClass('gyu-seleccionado', o.seleccionada)
                        .toggleClass('gyu-deshabilitado', o.deshabilitada)
                        .attr('data-value', o.valor);

                    if (multiple) $item.append('<span class="gyu-seleccion-casilla"></span>');
                    else if (o.imagen) $item.append(imagen(o.imagen));
                    $item.append($('<span class="gyu-seleccion-texto"></span>').text(o.texto));

                    $item.on('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (o.deshabilitada) return;

                        if (multiple) {
                            o.seleccionada = !o.seleccionada;
                            o.el.prop('selected', o.seleccionada);
                            $item.toggleClass('gyu-seleccionado', o.seleccionada);
                            actualizarRotulo();
                        } else {
                            o.el.prop('selected', true);
                            cerrar();
                        }
                        $select.trigger('change');
                    });
                    $opciones.append($item);
                });
                $desplegable.append($opciones);
            }

            function sincronizar() {
                leerOpciones();
                $activador.prop('disabled', $select.prop('disabled'));
                if ($select.prop('disabled')) cerrar();
                dibujar();
                actualizarRotulo();
            }

            $activador.on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($select.prop('disabled')) return;

                var abierto = $caja.hasClass('gyu-abierto');
                $('.gyu-seleccion.gyu-abierto').not($caja).each(function () {
                    $(this).data('gyuCerrar')();
                });

                if (abierto) {
                    cerrar();
                } else {
                    $caja.addClass('gyu-abierto');
                    abrirPanel();
                }

                if (!abierto) {
                    var $buscar = $desplegable.find('.gyu-seleccion-busqueda-entrada');
                    if ($buscar.length) {
                        $buscar.val('').trigger('input');
                        setTimeout(function () { $buscar.focus(); }, 60);
                    }
                }
            });

            $caja.data('gyuCerrar', cerrar);
            $select.on('change.gyuSeleccion gyu.actualizar', sincronizar);
            sincronizar();
        });
    };

    function cerrarSelecciones() {
        $('.gyu-seleccion.gyu-abierto').each(function () {
            $(this).data('gyuCerrar')();
        });
    }

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.gyu-seleccion, .gyu-seleccion-desplegable').length) {
            cerrarSelecciones();
        }
    });

    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') cerrarSelecciones();
    });

    var FECHA_DEFECTOS = {
        monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        weekdaysShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        todayText: 'Hoy',
        closeText: 'Cerrar',
        prevText: 'Mes anterior',
        nextText: 'Mes siguiente',
        closeOnSelect: true,
        firstDay: 0,
        placement: 'auto',
        size: 'normal',
        onSelect: null
    };

    var fechaUid = 0;

    function fechaCero(n) {
        return n < 10 ? '0' + n : '' + n;
    }

    function fechaTexto(d) {
        if (!d || !(d instanceof Date) || isNaN(d.getTime())) return '';
        return d.getFullYear() + '-' + fechaCero(d.getMonth() + 1) + '-' + fechaCero(d.getDate());
    }

    function fechaLeer(str) {
        if (!str || typeof str !== 'string') return null;
        var p = str.trim().split(/[T ]/)[0].split('-');
        if (p.length !== 3) return null;
        var y = parseInt(p[0], 10);
        var m = parseInt(p[1], 10) - 1;
        var d = parseInt(p[2], 10);
        if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
        var fecha = new Date(y, m, d);
        if (fecha.getFullYear() === y && fecha.getMonth() === m && fecha.getDate() === d) return fecha;
        return null;
    }

    function fechaIgual(a, b) {
        return !!a && !!b &&
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate();
    }

    function horaLeer(str) {
        var m = /[T ](\d{1,2}):(\d{2})/.exec(str || '');
        if (!m) return null;
        var h = parseInt(m[1], 10);
        var n = parseInt(m[2], 10);
        if (h > 23 || n > 59) return null;
        return { h: h, m: n };
    }

    function GyuFecha(elemento, opciones) {
        this.$input = $(elemento);
        this.conHora = this.$input.attr('type') === 'datetime-local';
        this.opciones = $.extend({}, FECHA_DEFECTOS, opciones);
        if (this.conHora) {
            if (!opciones || opciones.todayText == null) this.opciones.todayText = 'Ahora';
            if (!opciones || opciones.closeText == null) this.opciones.closeText = 'Aceptar';
            this.opciones.closeOnSelect = false;
        }
        this.ns = '.gyuFecha' + (++fechaUid);
        this.opciones.min = this.opciones.min || fechaLeer(this.$input.attr('min'));
        this.opciones.max = this.opciones.max || fechaLeer(this.$input.attr('max'));
        this.seleccionada = fechaLeer(this.$input.val());
        var tiempo = horaLeer(this.$input.val()) || { h: new Date().getHours(), m: new Date().getMinutes() };
        this.hora = tiempo.h;
        this.minuto = tiempo.m;
        var inicial = this.seleccionada || new Date();
        this.anio = inicial.getFullYear();
        this.mes = inicial.getMonth();
        this.$popover = null;
        this.abierto = false;
        this.iniciar();
    }

    GyuFecha.prototype = {
        iniciar: function () {
            var self = this;
            if (this.$input.attr('type') === 'date' || this.$input.attr('type') === 'datetime-local') this.$input.attr('type', 'text');
            this.$input.attr({ autocomplete: 'off', maxlength: this.conHora ? 16 : 10 });
            if (!this.$input.is('[data-gyu-fecha]')) this.$input.attr('data-gyu-fecha', '');
            if (!this.$input.attr('placeholder')) this.$input.attr('placeholder', this.conHora ? 'aaaa-mm-ddThh:mm' : 'aaaa-mm-dd');

            this.$input.on('click' + this.ns + ' focus' + this.ns, function (e) {
                e.stopPropagation();
                self.open();
            });

            this.$input.on('keydown' + this.ns, function (e) {
                if (e.key === 'Escape') self.close();
            });
        },

        construir: function () {
            var self = this;
            var o = this.opciones;
            if (this.$popover) this.$popover.remove();

            var clase = 'gyu-fecha' + (o.size === 'compact' ? ' gyu-fecha-compacto' : '');
            var btnPie = o.size === 'compact' ? 'gyu-btn-xs' : 'gyu-btn-sm';

            this.$popover = $(
                '<div class="' + clase + '" style="display:none;" role="dialog">' +
                    '<div class="gyu-fecha-encabezado">' +
                        '<button type="button" class="gyu-fecha-nav gyu-fecha-anterior" aria-label="' + o.prevText + '">' +
                            '<svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 11L1 6L6 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                        '</button>' +
                        '<div class="gyu-fecha-titulo"><span class="gyu-fecha-titulo-mes"></span> <span class="gyu-fecha-titulo-anio"></span></div>' +
                        '<button type="button" class="gyu-fecha-nav gyu-fecha-siguiente" aria-label="' + o.nextText + '">' +
                            '<svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1L6 6L1 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                        '</button>' +
                    '</div>' +
                    '<div class="gyu-fecha-dias-semana"></div>' +
                    '<div class="gyu-fecha-cuadricula"></div>' +
                    (this.conHora
                        ? '<div class="gyu-fecha-tiempo">' +
                            '<input type="text" class="gyu-input gyu-fecha-hora" inputmode="numeric" maxlength="2" aria-label="Hora" autocomplete="off">' +
                            '<span>:</span>' +
                            '<input type="text" class="gyu-input gyu-fecha-minuto" inputmode="numeric" maxlength="2" aria-label="Minutos" autocomplete="off">' +
                        '</div>'
                        : '') +
                    '<div class="gyu-fecha-pie">' +
                        '<button type="button" class="gyu-btn-solid ' + btnPie + ' gyu-fecha-hoy">' + o.todayText + '</button>' +
                        '<button type="button" class="gyu-btn-subtle gyu-theme-secondary ' + btnPie + ' gyu-fecha-cerrar">' + o.closeText + '</button>' +
                    '</div>' +
                '</div>'
            ).appendTo('body');

            var $semana = this.$popover.find('.gyu-fecha-dias-semana');
            for (var i = 0; i < 7; i++) {
                $semana.append('<div class="gyu-fecha-dia-semana">' + o.weekdaysShort[(i + o.firstDay) % 7] + '</div>');
            }

            this.$popover.on('click', '.gyu-fecha-anterior', function (e) { e.stopPropagation(); self.prevMonth(); });
            this.$popover.on('click', '.gyu-fecha-siguiente', function (e) { e.stopPropagation(); self.nextMonth(); });
            this.$popover.on('click', '.gyu-fecha-hoy', function (e) {
                e.stopPropagation();
                var ahora = new Date();
                if (self.conHora) {
                    self.hora = ahora.getHours();
                    self.minuto = ahora.getMinutes();
                    self.dibujarTiempo();
                }
                self.seleccionar(ahora);
            });
            this.$popover.on('input', '.gyu-fecha-hora, .gyu-fecha-minuto', function () {
                var limpio = $(this).val().replace(/\D/g, '');
                $(this).val(limpio);
                self.leerTiempo();
                self.escribirValor();
            });
            this.$popover.on('blur', '.gyu-fecha-hora, .gyu-fecha-minuto', function () {
                self.leerTiempo();
                self.dibujarTiempo();
                self.escribirValor();
            });
            this.$popover.on('keydown', '.gyu-fecha-hora, .gyu-fecha-minuto', function (e) {
                if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
                e.preventDefault();
                var paso = e.key === 'ArrowUp' ? 1 : -1;
                self.leerTiempo();
                if ($(this).hasClass('gyu-fecha-hora')) self.hora = (self.hora + paso + 24) % 24;
                else self.minuto = (self.minuto + paso + 60) % 60;
                self.dibujarTiempo();
                self.escribirValor();
            });
            this.$popover.on('click', '.gyu-fecha-cerrar', function (e) { e.stopPropagation(); self.close(); });
            this.$popover.on('click', '.gyu-fecha-dia', function (e) {
                e.stopPropagation();
                var elegida = fechaLeer($(this).attr('data-fecha'));
                if (elegida) self.seleccionar(elegida);
            });
            this.$popover.on('mousedown click', function (e) { e.stopPropagation(); });
        },

        dibujar: function () {
            if (!this.$popover) return;
            var o = this.opciones;
            this.$popover.find('.gyu-fecha-titulo-mes').text(o.monthsFull[this.mes]);
            this.$popover.find('.gyu-fecha-titulo-anio').text(this.anio);

            var diasMes = new Date(this.anio, this.mes + 1, 0).getDate();
            var inicio = new Date(this.anio, this.mes, 1).getDay() - o.firstDay;
            if (inicio < 0) inicio += 7;
            var diasPrevio = new Date(this.anio, this.mes, 0).getDate();
            var hoy = new Date();
            var self = this;
            var html = '';

            function dia(fecha, numero, extra) {
                var clase = 'gyu-fecha-dia' + extra;
                var bloqueado = !self.permitida(fecha);
                if (fechaIgual(fecha, self.seleccionada)) clase += ' gyu-seleccionado';
                if (bloqueado) clase += ' gyu-deshabilitado';
                return '<button type="button" class="' + clase + '"' + (bloqueado ? ' disabled' : '') + ' data-fecha="' + fechaTexto(fecha) + '">' + numero + '</button>';
            }

            for (var p = inicio - 1; p >= 0; p--) {
                html += dia(new Date(this.anio, this.mes - 1, diasPrevio - p), diasPrevio - p, ' gyu-fecha-dia-fuera');
            }
            for (var d = 1; d <= diasMes; d++) {
                var actual = new Date(this.anio, this.mes, d);
                html += dia(actual, d, fechaIgual(actual, hoy) ? ' gyu-fecha-dia-hoy' : '');
            }
            var total = inicio + diasMes;
            var siguientes = (7 - (total % 7)) % 7;
            if (total + siguientes < 35) siguientes += 7;
            for (var n = 1; n <= siguientes; n++) {
                html += dia(new Date(this.anio, this.mes + 1, n), n, ' gyu-fecha-dia-fuera');
            }

            this.$popover.find('.gyu-fecha-cuadricula').html(html);
        },

        dibujarTiempo: function () {
            if (!this.$popover || !this.conHora) return;
            this.$popover.find('.gyu-fecha-hora').val(fechaCero(this.hora));
            this.$popover.find('.gyu-fecha-minuto').val(fechaCero(this.minuto));
        },

        leerTiempo: function () {
            if (!this.$popover || !this.conHora) return;
            var h = parseInt(this.$popover.find('.gyu-fecha-hora').val(), 10);
            var m = parseInt(this.$popover.find('.gyu-fecha-minuto').val(), 10);
            this.hora = isNaN(h) ? 0 : Math.min(23, h);
            this.minuto = isNaN(m) ? 0 : Math.min(59, m);
        },

        escribirValor: function () {
            if (!this.seleccionada) return;
            var texto = fechaTexto(this.seleccionada);
            if (this.conHora) texto += 'T' + fechaCero(this.hora) + ':' + fechaCero(this.minuto);
            this.$input.val(texto).trigger('change');
        },

        permitida: function (fecha) {
            var o = this.opciones;
            var dia = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
            if (o.min && dia < o.min) return false;
            if (o.max && dia > o.max) return false;
            return true;
        },

        posicionar: function () {
            if (!this.$popover || !this.abierto) return;
            var compacto = this.opciones.size === 'compact';
            var pos = this.$input.offset();
            var altoInput = this.$input.outerHeight();
            var ancho = this.$popover.outerWidth() || (compacto ? 270 : 300);
            var alto = this.$popover.outerHeight() || (compacto ? 260 : 300);
            var anchoVentana = $(window).width();
            var scroll = $(window).scrollTop();
            var debajo = ($(window).height() + scroll) - (pos.top + altoInput);
            var encima = pos.top - scroll;

            var lugar = this.opciones.placement;
            if (lugar === 'auto') lugar = (debajo < alto && encima > debajo) ? 'top' : 'bottom';

            var top;
            if (lugar === 'top') {
                top = pos.top - alto - 8;
                this.$popover.addClass('gyu-fecha-arriba');
            } else {
                top = pos.top + altoInput + 8;
                this.$popover.removeClass('gyu-fecha-arriba');
            }

            var left = pos.left;
            if (left + ancho > anchoVentana - 10) left = Math.max(10, anchoVentana - ancho - 20);
            if (left < 10) left = 10;

            this.$popover.css({ top: top + 'px', left: left + 'px' });
        },

        open: function () {
            if (this.abierto || this.$input.prop('readonly') || this.$input.prop('disabled')) return;
            var self = this;
            $('.gyu-fecha').hide();

            var leida = fechaLeer(this.$input.val());
            var base = leida || new Date();
            this.seleccionada = leida;
            this.anio = base.getFullYear();
            this.mes = base.getMonth();

            if (this.conHora) {
                var tiempo = horaLeer(this.$input.val());
                if (tiempo) {
                    this.hora = tiempo.h;
                    this.minuto = tiempo.m;
                }
            }

            if (!this.$popover) this.construir();
            this.dibujar();
            this.dibujarTiempo();
            this.abierto = true;
            this.$popover.show();
            this.posicionar();

            $(document).on('mousedown' + this.ns, function (e) {
                if (!$(e.target).closest('.gyu-fecha').length && !$(e.target).is(self.$input)) self.close();
            });
            $(window).on('resize' + this.ns + ' scroll' + this.ns, function () {
                self.posicionar();
            });
        },

        close: function () {
            if (this.$popover) this.$popover.hide();
            this.abierto = false;
            $(document).off('mousedown' + this.ns);
            $(window).off('resize' + this.ns + ' scroll' + this.ns);
        },

        prevMonth: function () {
            this.mes--;
            if (this.mes < 0) {
                this.mes = 11;
                this.anio--;
            }
            this.dibujar();
        },

        nextMonth: function () {
            this.mes++;
            if (this.mes > 11) {
                this.mes = 0;
                this.anio++;
            }
            this.dibujar();
        },

        seleccionar: function (fecha) {
            if (!this.permitida(fecha)) return;
            this.seleccionada = fecha;
            this.anio = fecha.getFullYear();
            this.mes = fecha.getMonth();

            if (this.conHora) this.leerTiempo();
            var texto = fechaTexto(fecha);
            if (this.conHora) texto += 'T' + fechaCero(this.hora) + ':' + fechaCero(this.minuto);
            this.$input.val(texto).trigger('change');

            if (typeof this.opciones.onSelect === 'function') this.opciones.onSelect.call(this, texto, fecha);

            if (this.opciones.closeOnSelect) this.close();
            else this.dibujar();
        },

        destroy: function () {
            this.close();
            this.$input.off(this.ns).removeData('gyuFecha');
            if (this.$popover) this.$popover.remove();
            this.$popover = null;
        }
    };

    $.fn.gyuFecha = function (opcion) {
        var opciones = typeof opcion === 'object' ? opcion : null;
        return this.each(function () {
            var $this = $(this);
            var instancia = $this.data('gyuFecha');
            if (!instancia) {
                instancia = new GyuFecha(this, opciones);
                $this.data('gyuFecha', instancia);
            }
            if (typeof opcion === 'string' && typeof instancia[opcion] === 'function') instancia[opcion]();
        });
    };

    var FECHA_AUTO = 'input.gyu-input[type="date"], input.gyu-input[type="datetime-local"]';

    function fechaAuto(raiz) {
        var $raiz = $(raiz);
        $raiz.filter(FECHA_AUTO).add($raiz.find(FECHA_AUTO)).each(function () {
            if (!$(this).data('gyuFecha')) $(this).gyuFecha();
        });
    }

    $(function () {
        fechaAuto(document.body);
        if (!window.MutationObserver) return;
        new MutationObserver(function (cambios) {
            for (var i = 0; i < cambios.length; i++) {
                for (var j = 0; j < cambios[i].addedNodes.length; j++) {
                    if (cambios[i].addedNodes[j].nodeType === 1) fechaAuto(cambios[i].addedNodes[j]);
                }
            }
        }).observe(document.body, { childList: true, subtree: true });
    });

    $(document).on('click focusin', 'input[data-gyu-fecha]', function () {
        var $input = $(this);
        if (!$input.data('gyuFecha')) {
            var tamano = $input.attr('data-gyu-fecha');
            $input.gyuFecha({ size: tamano === 'compact' ? 'compact' : 'normal' }).gyuFecha('open');
        }
    });

})(window.jQuery || window.$);

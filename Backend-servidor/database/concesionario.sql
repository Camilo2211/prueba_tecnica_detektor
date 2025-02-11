PGDMP      4                |            concesionario    16.6    16.6                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16394    concesionario    DATABASE     �   CREATE DATABASE concesionario WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE concesionario;
                postgres    false            �            1259    16406    grupos    TABLE     �   CREATE TABLE public.grupos (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    descripcion text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.grupos;
       public         heap    postgres    false            �            1259    16405    grupos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.grupos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.grupos_id_seq;
       public          postgres    false    218                       0    0    grupos_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.grupos_id_seq OWNED BY public.grupos.id;
          public          postgres    false    217            �            1259    16396 	   vehiculos    TABLE     b  CREATE TABLE public.vehiculos (
    id integer NOT NULL,
    marca character varying(50) NOT NULL,
    modelo character varying(50) NOT NULL,
    anio integer NOT NULL,
    color character varying(30) NOT NULL,
    ubicacion character varying(100),
    placa character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.vehiculos;
       public         heap    postgres    false            �            1259    16435    vehiculos_grupos    TABLE     �   CREATE TABLE public.vehiculos_grupos (
    id integer NOT NULL,
    vehiculo_id integer NOT NULL,
    grupo_id integer NOT NULL
);
 $   DROP TABLE public.vehiculos_grupos;
       public         heap    postgres    false            �            1259    16434    vehiculos_grupos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vehiculos_grupos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.vehiculos_grupos_id_seq;
       public          postgres    false    220                       0    0    vehiculos_grupos_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.vehiculos_grupos_id_seq OWNED BY public.vehiculos_grupos.id;
          public          postgres    false    219            �            1259    16395    vehiculos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vehiculos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.vehiculos_id_seq;
       public          postgres    false    216                       0    0    vehiculos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.vehiculos_id_seq OWNED BY public.vehiculos.id;
          public          postgres    false    215            \           2604    16409 	   grupos id    DEFAULT     f   ALTER TABLE ONLY public.grupos ALTER COLUMN id SET DEFAULT nextval('public.grupos_id_seq'::regclass);
 8   ALTER TABLE public.grupos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            Z           2604    16399    vehiculos id    DEFAULT     l   ALTER TABLE ONLY public.vehiculos ALTER COLUMN id SET DEFAULT nextval('public.vehiculos_id_seq'::regclass);
 ;   ALTER TABLE public.vehiculos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            ^           2604    16438    vehiculos_grupos id    DEFAULT     z   ALTER TABLE ONLY public.vehiculos_grupos ALTER COLUMN id SET DEFAULT nextval('public.vehiculos_grupos_id_seq'::regclass);
 B   ALTER TABLE public.vehiculos_grupos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �          0    16406    grupos 
   TABLE DATA           E   COPY public.grupos (id, nombre, descripcion, created_at) FROM stdin;
    public          postgres    false    218   �        �          0    16396 	   vehiculos 
   TABLE DATA           a   COPY public.vehiculos (id, marca, modelo, anio, color, ubicacion, placa, created_at) FROM stdin;
    public          postgres    false    216   T!       �          0    16435    vehiculos_grupos 
   TABLE DATA           E   COPY public.vehiculos_grupos (id, vehiculo_id, grupo_id) FROM stdin;
    public          postgres    false    220   �!       	           0    0    grupos_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.grupos_id_seq', 2, true);
          public          postgres    false    217            
           0    0    vehiculos_grupos_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.vehiculos_grupos_id_seq', 10, true);
          public          postgres    false    219                       0    0    vehiculos_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.vehiculos_id_seq', 2, true);
          public          postgres    false    215            d           2606    16414    grupos grupos_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.grupos
    ADD CONSTRAINT grupos_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.grupos DROP CONSTRAINT grupos_pkey;
       public            postgres    false    218            f           2606    16442 &   vehiculos_grupos unique_vehiculo_grupo 
   CONSTRAINT     r   ALTER TABLE ONLY public.vehiculos_grupos
    ADD CONSTRAINT unique_vehiculo_grupo UNIQUE (vehiculo_id, grupo_id);
 P   ALTER TABLE ONLY public.vehiculos_grupos DROP CONSTRAINT unique_vehiculo_grupo;
       public            postgres    false    220    220            h           2606    16440 &   vehiculos_grupos vehiculos_grupos_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.vehiculos_grupos
    ADD CONSTRAINT vehiculos_grupos_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.vehiculos_grupos DROP CONSTRAINT vehiculos_grupos_pkey;
       public            postgres    false    220            `           2606    16402    vehiculos vehiculos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.vehiculos
    ADD CONSTRAINT vehiculos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.vehiculos DROP CONSTRAINT vehiculos_pkey;
       public            postgres    false    216            b           2606    16404    vehiculos vehiculos_placa_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.vehiculos
    ADD CONSTRAINT vehiculos_placa_key UNIQUE (placa);
 G   ALTER TABLE ONLY public.vehiculos DROP CONSTRAINT vehiculos_placa_key;
       public            postgres    false    216            i           2606    16448    vehiculos_grupos fk_grupo    FK CONSTRAINT     �   ALTER TABLE ONLY public.vehiculos_grupos
    ADD CONSTRAINT fk_grupo FOREIGN KEY (grupo_id) REFERENCES public.grupos(id) ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.vehiculos_grupos DROP CONSTRAINT fk_grupo;
       public          postgres    false    220    4708    218            j           2606    16443    vehiculos_grupos fk_vehiculo    FK CONSTRAINT     �   ALTER TABLE ONLY public.vehiculos_grupos
    ADD CONSTRAINT fk_vehiculo FOREIGN KEY (vehiculo_id) REFERENCES public.vehiculos(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.vehiculos_grupos DROP CONSTRAINT fk_vehiculo;
       public          postgres    false    220    4704    216            �   d   x�3�L���/��
)�
9��
��%�ŜFF&��F@�`hdelie`�gh`j`a�eę�X��!��r�R3�M.��G�fle`aeb�g`ibhb����� K�B      �   �   x�3�L�-��5�4202�,��,I�L�O�/I�t�w�577ɘ�����������������!�gnjQrjJj�BRj^�������cp���1�Ĥ���l��n�޺�&(&�[�X���M����� �Q#�      �      x�3�4�4��4��@�!W� %��     
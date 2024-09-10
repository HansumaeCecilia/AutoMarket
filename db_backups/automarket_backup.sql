PGDMP       9    
    
        |        
   AutoMarket    16.2    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16561 
   AutoMarket    DATABASE     �   CREATE DATABASE "AutoMarket" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Finnish_Finland.1252';
    DROP DATABASE "AutoMarket";
                postgres    false            �            1259    16602 	   car_brand    TABLE     p   CREATE TABLE public.car_brand (
    brand_id integer NOT NULL,
    brand_name character varying(20) NOT NULL
);
    DROP TABLE public.car_brand;
       public         heap    postgres    false            �            1259    16607    car_brand_brand_id_seq    SEQUENCE     �   ALTER TABLE public.car_brand ALTER COLUMN brand_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.car_brand_brand_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    16608 	   car_model    TABLE     �   CREATE TABLE public.car_model (
    model_id integer NOT NULL,
    model_name character varying(20) NOT NULL,
    brand_id integer NOT NULL
);
    DROP TABLE public.car_model;
       public         heap    postgres    false            �            1259    16619    car_model_model_id_seq    SEQUENCE     �   ALTER TABLE public.car_model ALTER COLUMN model_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.car_model_model_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221            �            1259    16582    cars    TABLE     �   CREATE TABLE public.cars (
    id integer NOT NULL,
    brand character varying(50) NOT NULL,
    model character varying(50) NOT NULL,
    price integer NOT NULL
);
    DROP TABLE public.cars;
       public         heap    postgres    false            �            1259    16587    cars_id_seq    SEQUENCE     �   ALTER TABLE public.cars ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �            1259    16594    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16601    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1234
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �          0    16602 	   car_brand 
   TABLE DATA           9   COPY public.car_brand (brand_id, brand_name) FROM stdin;
    public          postgres    false    219   �       �          0    16608 	   car_model 
   TABLE DATA           C   COPY public.car_model (model_id, model_name, brand_id) FROM stdin;
    public          postgres    false    221          �          0    16582    cars 
   TABLE DATA           7   COPY public.cars (id, brand, model, price) FROM stdin;
    public          postgres    false    215   �!       �          0    16594    users 
   TABLE DATA           :   COPY public.users (id, name, email, password) FROM stdin;
    public          postgres    false    217   "       �           0    0    car_brand_brand_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.car_brand_brand_id_seq', 44, true);
          public          postgres    false    220            �           0    0    car_model_model_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.car_model_model_id_seq', 217, true);
          public          postgres    false    222            �           0    0    cars_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.cars_id_seq', 8, true);
          public          postgres    false    216            �           0    0    users_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.users_id_seq', 1236, true);
          public          postgres    false    218            .           2606    16606    car_brand car_brand_pk 
   CONSTRAINT     Z   ALTER TABLE ONLY public.car_brand
    ADD CONSTRAINT car_brand_pk PRIMARY KEY (brand_id);
 @   ALTER TABLE ONLY public.car_brand DROP CONSTRAINT car_brand_pk;
       public            postgres    false    219            2           2606    16612    car_model car_model_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.car_model
    ADD CONSTRAINT car_model_pkey PRIMARY KEY (model_id);
 B   ALTER TABLE ONLY public.car_model DROP CONSTRAINT car_model_pkey;
       public            postgres    false    221            *           2606    16586    cars cars_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.cars DROP CONSTRAINT cars_pkey;
       public            postgres    false    215            0           2606    16621    car_brand uq_brand_name 
   CONSTRAINT     X   ALTER TABLE ONLY public.car_brand
    ADD CONSTRAINT uq_brand_name UNIQUE (brand_name);
 A   ALTER TABLE ONLY public.car_brand DROP CONSTRAINT uq_brand_name;
       public            postgres    false    219            4           2606    16623    car_model uq_model_name 
   CONSTRAINT     X   ALTER TABLE ONLY public.car_model
    ADD CONSTRAINT uq_model_name UNIQUE (model_name);
 A   ALTER TABLE ONLY public.car_model DROP CONSTRAINT uq_model_name;
       public            postgres    false    221            ,           2606    16600    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    217            5           2606    16613 !   car_model car_model_brand_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.car_model
    ADD CONSTRAINT car_model_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.car_brand(brand_id);
 K   ALTER TABLE ONLY public.car_model DROP CONSTRAINT car_model_brand_id_fkey;
       public          postgres    false    4654    219    221            �   F  x���R#1�ϭ�������1	�2�(�pQfD�±){O�ZN�T%�Zm��jf�X�w��MGI䰨������XV�}�+�}�����r
2�L9�K�Ls\�~/dFXKΜ=��灌�:垌õD)��ipݮȌq�b�d&�9W%ݚ�6�����x_9���N���^l��Ky�I�V���'�b6�]��"�1Z.�YU�D�G��)Zɝ�R.������͵��|9xr#<�R8�3��r�B�b�GrOuǹ�k�,%0�1��9J���Q�x/�<�ߝ4ᙪ��k�n��O	���!șUM�i���5�vID� ��z�      �   {  x�M�Ks�8�ח_��z��d�3�;��x�a�ja��:����rf��|��:�J���\�&��T=�������6>x�4	�P�x��5I��ho.�5$�3���N	����0�����v挞�o�?p��7�u�'�-�J���q��co�h�D�%	����$
Zg�(I,�&Xӑ\0��ZM�Q���i�6>R mg�GDIl�MZѶk��gC�	�֕�TN�JN���u�	��)���9�����Wщ������X�����lc_m�'�co:\L�$#9gڏ���!���'�H�rW�Il��XV���ާJA�|��+�H����؂�U�uҌ���*8퇮�G_7�Bb�Q�M�,��Yfؽ	qT`��i�賝��*>�m������0�p��4��m���ѷ���])���L$��^/Lb�����=�٬1u1�[��oX �%¹���1�'Z�������7�cR5����9M��`Q�9|V�������vJq� �F��a��ԎX��	�P�����q	lǖ�m�D~OF���L"N��8�Ȑ�1)I��R���E��� �����)�-�M�T*h�fO�GY��9�r3!Bt�79����đH�iSߩ�qg@/�6�9U$�߸hG69��i�$���$6�o�$������5:+%m�p�@d�u�+K�go�Yn���p�h"	Z��^q!���_`��*��� ���@<����-7!N�n��Ļ-r��)ȥ\�����iN���G�	�"v~�͏���zwꄊ��l��Hٌٔ"a>c�.�+�3+1I�5ǧw޽�[�����H'��n/C�h$A�}�c��R�ˇ�hW}%Q@�α��,�3�����_��{R      �   Y   x�3�t,M��t4�4�40�2�����N,��H-*)��44 .#N���N��������TNs��D�?75=��$b�,bd
����� �      �   �   x�]�1n�0Fg�2#�I
cID��8	B],�'��V�8T�<�I.Vea`y����Qĥ�*��8\�AY��C�_'������cʢ�q���{@��F��z�!�!%���t�Y�Y�W�S��� /�I���0EN��r��d�9Z��=A+��
V�20�G�>7+�v�/�/�et�$yZ���Wf߾m��� ������KWV�d�0��uOJ     
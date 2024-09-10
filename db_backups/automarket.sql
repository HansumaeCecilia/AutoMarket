PGDMP              
        |        
   automarket    16.2    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16396 
   automarket    DATABASE        CREATE DATABASE automarket WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Finnish_Finland.1252';
    DROP DATABASE automarket;
                postgres    false            �            1259    24590 	   car_brand    TABLE     p   CREATE TABLE public.car_brand (
    brand_id integer NOT NULL,
    brand_name character varying(20) NOT NULL
);
    DROP TABLE public.car_brand;
       public         heap    postgres    false            �            1259    24595    car_brand_brand_id_seq    SEQUENCE     �   ALTER TABLE public.car_brand ALTER COLUMN brand_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.car_brand_brand_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    24596 	   car_model    TABLE     �   CREATE TABLE public.car_model (
    model_id integer NOT NULL,
    model_name character varying(20) NOT NULL,
    brand_id integer NOT NULL
);
    DROP TABLE public.car_model;
       public         heap    postgres    false            �            1259    24607    car_model_model_id_seq    SEQUENCE     �   ALTER TABLE public.car_model ALTER COLUMN model_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.car_model_model_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221            �            1259    24576    cars    TABLE     �   CREATE TABLE public.cars (
    id integer NOT NULL,
    brand character varying(50) NOT NULL,
    model character varying(50) NOT NULL,
    price integer
);
    DROP TABLE public.cars;
       public         heap    postgres    false            �            1259    24581    cars_id_seq    SEQUENCE     �   ALTER TABLE public.cars ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �            1259    24582    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24589    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1235
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �          0    24590 	   car_brand 
   TABLE DATA           9   COPY public.car_brand (brand_id, brand_name) FROM stdin;
    public          postgres    false    219   �       �          0    24596 	   car_model 
   TABLE DATA           C   COPY public.car_model (model_id, model_name, brand_id) FROM stdin;
    public          postgres    false    221   !       �          0    24576    cars 
   TABLE DATA           7   COPY public.cars (id, brand, model, price) FROM stdin;
    public          postgres    false    215   "       �          0    24582    users 
   TABLE DATA           :   COPY public.users (id, name, email, password) FROM stdin;
    public          postgres    false    217   �"       �           0    0    car_brand_brand_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.car_brand_brand_id_seq', 59, true);
          public          postgres    false    220            �           0    0    car_model_model_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.car_model_model_id_seq', 501, true);
          public          postgres    false    222            �           0    0    cars_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.cars_id_seq', 12, true);
          public          postgres    false    216            �           0    0    users_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.users_id_seq', 1238, true);
          public          postgres    false    218            .           2606    24594    car_brand car_brand_pk 
   CONSTRAINT     Z   ALTER TABLE ONLY public.car_brand
    ADD CONSTRAINT car_brand_pk PRIMARY KEY (brand_id);
 @   ALTER TABLE ONLY public.car_brand DROP CONSTRAINT car_brand_pk;
       public            postgres    false    219            2           2606    24600    car_model car_model_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.car_model
    ADD CONSTRAINT car_model_pkey PRIMARY KEY (model_id);
 B   ALTER TABLE ONLY public.car_model DROP CONSTRAINT car_model_pkey;
       public            postgres    false    221            *           2606    24580    cars cars_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.cars DROP CONSTRAINT cars_pkey;
       public            postgres    false    215            0           2606    24615    car_brand uq_brand_name 
   CONSTRAINT     X   ALTER TABLE ONLY public.car_brand
    ADD CONSTRAINT uq_brand_name UNIQUE (brand_name);
 A   ALTER TABLE ONLY public.car_brand DROP CONSTRAINT uq_brand_name;
       public            postgres    false    219            4           2606    24617    car_model uq_model_name 
   CONSTRAINT     X   ALTER TABLE ONLY public.car_model
    ADD CONSTRAINT uq_model_name UNIQUE (model_name);
 A   ALTER TABLE ONLY public.car_model DROP CONSTRAINT uq_model_name;
       public            postgres    false    221            ,           2606    24586    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    217            5           2606    24601 !   car_model car_model_brand_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.car_model
    ADD CONSTRAINT car_model_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.car_brand(brand_id);
 K   ALTER TABLE ONLY public.car_model DROP CONSTRAINT car_model_brand_id_fkey;
       public          postgres    false    221    4654    219            �   Z  x���R�0E��W��Mm�i�l���e`�FMD�k3v\_�`�����*Xv%jX�7���3G4�,��
V�ZXם��5��{�p�/)z�NS��pױ?2�l8%J������ML=*78�����v���m=���v*B�5���7
7pG�B	���Q���
�t>�td��6���E�h[�,u[��j-eN$�����z-��{�V�P7���-���\�ܻ�)�Q�S�F�aGg4��@������'4��G���?�:�,���$܈J��i5<��Gk��t�n@[��ŝ��9��'�5\S'��,���8P�#��E�o3���      �   �  x�M��r�8�����d
[�.�̆��,{#�BT#,"��0O�G�3��|ml��t�9=�/I��	ڨ�l�j�Sm���%m��BU������1���z0ZR�h�+3�NO���g��E~��rZuāD%��-��:�4c�0�N�6`J[�k��h�5�ȓ���Aq��<(A;mF���R�i�>���TPmݨ�^,���TBU�]6�U7��ߤ;+G(�d�j?�N�g�/�d��J��iU&{��CocD�w�z��4b '�W�)d��!�Vw���P�f�z�$`������E�p'e���I2�^9')� N�F��D����n#済��( f{�uI�u���me�g�3�����3�R�ɶ��JE��?) =�I�-����]qʜ��;�}���PI��`T9�h>%��r��R!�`��\e�EDF(Q��g�3C�^QyyV�Q�^r�66���g����s\�E*���߂����u�x��@I�Ѿ*&�@���kUJ���9���������m�}&�����h�`��Q�(��X�� ��Y�)�)��N�QGxE��Ng6��F{7C$E�k㋗��>z\F�B}���W_8#hh{w�����_#��7�4�f�;`�@����Jjg�C}�]��^Y�^_$&���g5@F{�A���B�3ؓ#+yS-6Y@L�l��9Gc�|��Cc��V藮G�a���Q6?"º��)�̀m�I�dG�lB�Ox��*�������x�Q�d��KZ[�J�`�~�n��������SJ�����~�I2z�����'b0 �w��:jLw�ܿ���Ǚ��]�&(�����W�'yC!�H��x�Sӣw�/�;y7���2��b˼Gb��[�N���ng�F1�]C9�jpB��ԏ_��_4�&�����e~7�k�Qͼ��^5�3�ߗ�l�?I��      �   �   x�U��
�0E�7#i�h���7�Jhl����l]�s9�ᚿy%�h���Zyc)4#�'/��l���ȸ�jg�V-����g�I�Um��CD��N��>����k���℞��M#u���X��R�r�)L      �   �   x�3426��M,)�T�M��>�$��̼�<��Ē��L����L��L�@��Ԣ�J.C#c3NǼ�T���D��D �P�(Q��@%'��-�����'�;��7� Y�(�4���1;-9�3��/�Ť��)$Я<<���8;�Ǜ+F��� �b0|     
--
-- PostgreSQL database dump
--

\restrict Zrrie4lgLXV4lQtBMx1DdGaLDP4JkWTdAVPPLgDctNDaP7sHsDxrshhiMhbwr1x

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: ConstructionStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ConstructionStatus" AS ENUM (
    'UNDER_CONSTRUCTION',
    'READY_TO_MOVE',
    'NEW_LAUNCH',
    'NONE'
);


ALTER TYPE public."ConstructionStatus" OWNER TO postgres;

--
-- Name: LeadStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."LeadStatus" AS ENUM (
    'NEW',
    'CONTACTED',
    'CLOSED',
    'CANCELLED'
);


ALTER TYPE public."LeadStatus" OWNER TO postgres;

--
-- Name: LeadType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."LeadType" AS ENUM (
    'CALLBACK',
    'SITE_VISIT',
    'VIDEO_TOUR',
    'SELL_REQUEST'
);


ALTER TYPE public."LeadType" OWNER TO postgres;

--
-- Name: MediaType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."MediaType" AS ENUM (
    'IMAGE',
    'BROCHURE',
    'FLOOR_PLAN'
);


ALTER TYPE public."MediaType" OWNER TO postgres;

--
-- Name: ProjectStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ProjectStatus" AS ENUM (
    'ACTIVE',
    'SOLD_OUT',
    'UPCOMING',
    'INACTIVE'
);


ALTER TYPE public."ProjectStatus" OWNER TO postgres;

--
-- Name: PropertyStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PropertyStatus" AS ENUM (
    'ACTIVE',
    'SOLD',
    'INACTIVE'
);


ALTER TYPE public."PropertyStatus" OWNER TO postgres;

--
-- Name: PropertyType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PropertyType" AS ENUM (
    'FLAT',
    'BUNGALOW',
    'VILLA',
    'PLOT',
    'ROW_HOUSE',
    'COMMERCIAL',
    'APARTMENT'
);


ALTER TYPE public."PropertyType" OWNER TO postgres;

--
-- Name: PropertyView; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PropertyView" AS ENUM (
    'GARDEN',
    'POOL',
    'LAKE',
    'CITY',
    'NONE'
);


ALTER TYPE public."PropertyView" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'CONSUMER'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Amenity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Amenity" (
    id text NOT NULL,
    name text NOT NULL,
    category text DEFAULT 'General'::text NOT NULL
);


ALTER TABLE public."Amenity" OWNER TO postgres;

--
-- Name: BlogPost; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BlogPost" (
    id text NOT NULL,
    "authorId" text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    "coverImage" text,
    content text NOT NULL,
    published boolean DEFAULT false NOT NULL,
    "publishedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."BlogPost" OWNER TO postgres;

--
-- Name: Lead; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Lead" (
    id text NOT NULL,
    "userId" text,
    name text NOT NULL,
    phone text NOT NULL,
    type public."LeadType" NOT NULL,
    message text,
    "preferredDate" timestamp(3) without time zone,
    "preferredSlot" text,
    status public."LeadStatus" DEFAULT 'NEW'::public."LeadStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "projectId" text
);


ALTER TABLE public."Lead" OWNER TO postgres;

--
-- Name: Project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Project" (
    id text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    description text,
    "propertyType" public."PropertyType" DEFAULT 'APARTMENT'::public."PropertyType" NOT NULL,
    "constructionStatus" public."ConstructionStatus" DEFAULT 'UNDER_CONSTRUCTION'::public."ConstructionStatus" NOT NULL,
    "propertyView" public."PropertyView" DEFAULT 'NONE'::public."PropertyView" NOT NULL,
    "videoUrl" text,
    featured boolean DEFAULT false NOT NULL,
    status public."ProjectStatus" DEFAULT 'ACTIVE'::public."ProjectStatus" NOT NULL,
    "townshipId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT now() NOT NULL,
    address text DEFAULT ''::text,
    "googleMapUrl" text,
    latitude double precision,
    longitude double precision
);


ALTER TABLE public."Project" OWNER TO postgres;

--
-- Name: ProjectAmenity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProjectAmenity" (
    id text NOT NULL,
    "projectId" text NOT NULL,
    "amenityId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ProjectAmenity" OWNER TO postgres;

--
-- Name: ProjectConfiguration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProjectConfiguration" (
    id text NOT NULL,
    "projectId" text NOT NULL,
    bhk integer DEFAULT 1 NOT NULL,
    "carpetArea" double precision DEFAULT 0 NOT NULL,
    "builtUpArea" double precision,
    "superBuiltUpArea" double precision,
    "pricePerSqft" double precision DEFAULT 0 NOT NULL,
    "totalPrice" double precision DEFAULT 0 NOT NULL,
    label text,
    "availableUnits" integer,
    "isAvailable" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."ProjectConfiguration" OWNER TO postgres;

--
-- Name: ProjectMedia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProjectMedia" (
    id text NOT NULL,
    "projectId" text NOT NULL,
    "configurationId" text,
    url text NOT NULL,
    type public."MediaType" DEFAULT 'IMAGE'::public."MediaType" NOT NULL,
    "isCover" boolean DEFAULT false NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ProjectMedia" OWNER TO postgres;

--
-- Name: Township; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Township" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    locality text NOT NULL,
    city text DEFAULT 'Mumbai'::text NOT NULL,
    address text DEFAULT ''::text NOT NULL,
    latitude double precision,
    longitude double precision,
    "googleMapUrl" text,
    slug text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Township" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    email text,
    phone text,
    password text,
    role public."Role" DEFAULT 'CONSUMER'::public."Role" NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL,
    "isBlocked" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Amenity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Amenity" (id, name, category) FROM stdin;
cmryynzg80003uw9kmpdhbol9	Jacuzzi	Swimming & Water Features
cmrz5ikeg000luwvg76ei363c	Water Slide	Swimming & Water Features
cmrz5ikeh000muwvgjf5m78cf	Water Feature	Swimming & Water Features
cmrz5ikeh000nuwvgerbpfq1a	Fountain	Swimming & Water Features
cmrz5ikei000ouwvgd4pkebn0	Gymnasium	Sports Amenities
cmrz5ikej000puwvgkbc75476	Fitness Centre	Sports Amenities
cmrz5ikej000quwvgdltfgnoh	Yoga Deck	Sports Amenities
cmrz5ikek000ruwvg0shfe1j7	Meditation Area	Sports Amenities
cmrz5ikel000suwvgv1q9j7w1	Indoor Games	Sports Amenities
cmrz5ikel000tuwvg080xpgs2	Table Tennis	Sports Amenities
cmrz5ikem000uuwvgv5b5r8sn	Carrom	Sports Amenities
cmrz5ikem000vuwvgyirc81bo	Chess	Sports Amenities
cmrz5iken000wuwvgflocytks	Billiards	Sports Amenities
cmrz5iken000xuwvguj7fxptx	Squash Court	Sports Amenities
cmrz5ikeo000yuwvggaksdf8f	Badminton Court	Sports Amenities
cmrz5ikep000zuwvgl7idtu4m	Basketball Court	Sports Amenities
cmrz5ikep0010uwvg3d9cat99	Volleyball Court	Sports Amenities
cmrz5ikeq0011uwvg4fulhwis	Multipurpose Court	Sports Amenities
cmrz5ikeq0012uwvg56epsbnj	Lawn Tennis Court	Sports Amenities
cmrz5iker0013uwvgrq00zyrv	Cricket Practice Net	Sports Amenities
cmrz5ikes0014uwvgprmmr83y	Box Cricket	Sports Amenities
cmrz5ikes0015uwvgvhal4sj9	Futsal Court	Sports Amenities
cmrz5iket0016uwvgir7vnkm8	Skating Rink	Sports Amenities
cmrz5ikeu0017uwvg1ic8388x	Landscaped Garden	Outdoor & Landscape
cmrz5ikeu0018uwvglajsiok2	Central Greens	Outdoor & Landscape
cmryynzfw0001uw9k1wb0rg9y	Swimming pool with deck	Outdoor
cmryynzg50002uw9klsvlg5yc	Kids' pool	Outdoor
cmryynzg90004uw9koh3x0e7w	Pickleball court	Outdoor
cmryynzga0005uw9kj2ygzoum	Multipurpose court	Outdoor
cmryynzgb0006uw9k4eaicl2o	Zen garden	Outdoor
cmryynzgc0007uw9k21bt32e3	Reflexology path	Outdoor
cmryynzgc0008uw9kl0nu76p2	Kids' play area	Outdoor
cmryynzgd0009uw9knaf7urp7	Tree house	Outdoor
cmryynzge000auw9k9ozc97ko	Sand pit	Outdoor
cmryynzge000buw9kuw0taol3	Climbing wall	Outdoor
cmryynzgf000cuw9kxbd6zihe	BBQ area	Outdoor
cmryynzgg000duw9k2isy1cqs	Fitness centre/gymnasium	Indoor
cmryynzgg000euw9kow6bsf6x	Spa	Indoor
cmryynzgh000fuw9k9f5ssiqz	Steam room	Indoor
cmryynzgi000guw9k58ocetgc	Crèche	Indoor
cmryynzgi000huw9kq26jnpei	Multipurpose hall	Indoor
cmryynzgj000iuw9k7nnr37hd	Indoor games	Indoor
cmryynzgk000juw9kfrem1w9g	Rainwater harvesting	Green Features
cmrz5ikev0019uwvgik2o73hr	Open Lawn	Outdoor & Landscape
cmrz5ikew001auwvg3nhlj6xa	Multipurpose Lawn	Outdoor & Landscape
cmrz5ikex001buwvg9g7w3163	Amphitheatre	Outdoor & Landscape
cmrz5ikex001cuwvgfq7x7fmw	Seating Plaza	Outdoor & Landscape
cmrz5ikey001duwvgbl1fy9r1	Senior Citizen Area	Outdoor & Landscape
cmrz5ikey001euwvg486wekmi	Reflexology Path	Outdoor & Landscape
cmrz5ikez001fuwvg0sbd5olz	Herbal Garden	Outdoor & Landscape
cmrz5ikf0001guwvgdnme8w2b	Gazebo	Outdoor & Landscape
cmrz5ikf1001huwvgk9ljvh1a	Pergola	Outdoor & Landscape
cmrz5ikf1001iuwvgiouk68uk	Barbeque Area	Outdoor & Landscape
cmrz5ikf2001juwvgz4mcvqr0	Picnic Area	Outdoor & Landscape
cmrz5ikf3001kuwvgicn0abyi	Children's Play Area	Kids Amenities
cmrz5ikf3001luwvgxeqxax3h	Kids Play Zone	Kids Amenities
cmrz5ikf4001muwvgbtxxkbyi	Toddler Zone	Kids Amenities
cmrz5ikf5001nuwvg7c6bl13d	Sand Pit	Kids Amenities
cmrz5ikf5001ouwvgpf6d2zzs	Adventure Play Area	Kids Amenities
cmrz5ikf6001puwvggc4zp3xg	Indoor Kids Room	Kids Amenities
cmrz5ikf6001quwvgkrk0cjvm	Creche	Kids Amenities
cmrz5ikf7001ruwvgw1co6qo1	Jogging Track	Walking & Wellness
cmrz5ikf8001suwvg6kezhypr	Walking Track	Walking & Wellness
cmrz5ikf8001tuwvg6rj2e6qh	Cycling Track	Walking & Wellness
cmrz5ikf9001uuwvg0wo3zxah	Nature Trail	Walking & Wellness
cmryynzgk000kuw9kmrmfyp4r	Sewage treatment plant	Green Features
cmryynzgl000luw9k45x28skf	Solar panels for hot water	Green Features
cmryynzgl000muw9k52s068m7	Energy-efficient lighting	Green Features
cmryynzgm000nuw9kgmr77f5h	Low VOC paints	Green Features
cmrz5ikbm0000uwvghr1vmgcu	Clubhouse	Clubhouse & Community
cmrz5ikdx0001uwvgwqprjmp5	Multipurpose Hall	Clubhouse & Community
cmrz5ikdy0002uwvgy65x03ls	Party Hall	Clubhouse & Community
cmrz5ike00003uwvgzlz98wr7	Banquet Hall	Clubhouse & Community
cmrz5ike10004uwvg0o30z656	Community Hall	Clubhouse & Community
cmrz5ike20005uwvgxang37xt	Business Centre	Clubhouse & Community
cmrz5ike20006uwvgcts9655g	Co-working Space	Clubhouse & Community
cmrz5ike30007uwvg6euv1sxo	Library	Clubhouse & Community
cmrz5ike40008uwvgbbxhicbe	Reading Room	Clubhouse & Community
cmrz5ike50009uwvgl4yu0uku	Indoor Lounge	Clubhouse & Community
cmrz5ike6000auwvguwdyb5xw	Café / Restaurant	Clubhouse & Community
cmrz5ike7000buwvgkaouyxgw	Guest Rooms	Clubhouse & Community
cmrz5ike8000cuwvgditknw17	Reception Lobby	Clubhouse & Community
cmrz5ike8000duwvg0r9w8ccn	Swimming Pool	Swimming & Water Features
cmrz5ike9000euwvg68cpm2zg	Olympic Swimming Pool	Swimming & Water Features
cmrz5ikea000fuwvglvjwxxe5	Infinity Pool	Swimming & Water Features
cmrz5ikea000guwvggmdhnhhu	Kids Pool	Swimming & Water Features
cmrz5ikeb000huwvgf05xt4vq	Adventure Pool	Swimming & Water Features
cmrz5ikeb000iuwvgausjbb5d	Pool Deck	Swimming & Water Features
cmrz5ikec000juwvgyp0zxoi0	Pool Pavilion	Swimming & Water Features
cmrz5ikfa001vuwvgms3sb2vw	Meditation Zone	Walking & Wellness
cmrz5ikfe001wuwvgtes28kdj	Yoga Lawn	Walking & Wellness
cmrz5ikff001xuwvgnp45kk6x	Open Gym	Walking & Wellness
cmrz5ikfg001yuwvghyfv5ltd	Mini Theatre	Entertainment
cmrz5ikfg001zuwvguoq2a3ju	AV Room	Entertainment
cmrz5ikfh0020uwvgctcgobsx	Music Room	Entertainment
cmrz5ikfh0021uwvghsws73dz	Dance Studio	Entertainment
cmrz5ikfi0022uwvg8v6sdisv	Gaming Zone	Entertainment
cmrz5ikfi0023uwvgi1ivx8vt	Indoor Recreation Room	Entertainment
cmrz5ikfj0024uwvgsnig8umm	High Speed Elevators	Convenience
cmrz5ikfk0025uwvgrimrfk6u	Power Backup	Convenience
cmrz5ikfl0026uwvggac9663r	Visitor Parking	Convenience
cmrz5ikfm0027uwvglwhpf14y	Reserved Parking	Convenience
cmrz5ikfm0028uwvgsfqihye9	EV Charging Station	Convenience
cmrz5ikfn0029uwvgxklf4nfa	Society Office	Convenience
cmrz5ikfo002auwvgkrn8v1nt	Common Toilets	Convenience
cmrz5ikfo002buwvge3dyvo95	Wi-Fi Enabled Areas	Convenience
cmrz5ikfp002cuwvg5yscmma2	Intercom	Convenience
cmrz5ikfp002duwvgux7a9o5h	Parcel Room	Convenience
cmrz5ikfq002euwvgf34g7rvu	CCTV Surveillance	Security
cmrz5ikfr002fuwvg59faau9q	Video Door Phone	Security
cmrz5ikfr002guwvgqxiv811e	Smart Access Control	Security
cmrz5ikfs002huwvgm0tm36ik	Keyless Door Lock	Security
cmrz5ikft002iuwvgwrgtvfe5	Security Cabin	Security
cmrz5ikft002juwvghr0kc8lq	Boom Barrier	Security
cmrz5ikfu002kuwvgs1vfxg05	Fire Fighting System	Security
cmrz5ikfv002luwvge8bp8er5	Fire Alarm	Security
cmrz5ikfv002muwvg5me83uzs	Access Card Entry	Security
cmrz5ikfw002nuwvgyhr6iuoo	24x7 Security	Security
cmrz5ikfx002ouwvguviaz956	Air Conditioned Homes	Apartment Features
cmrz5ikfy002puwvgm3n84sen	Home Automation	Apartment Features
cmrz5ikfy002quwvgf3k44o4b	Smart Switches	Apartment Features
cmrz5ikfz002ruwvgc6xrc7hb	USB Charging Ports	Apartment Features
cmrz5ikfz002suwvgai81hlfw	Modular Kitchen	Apartment Features
cmrz5ikg0002tuwvgp2nts36k	Premium Kitchen Platform	Apartment Features
cmrz5ikg1002uuwvg8alw7dky	Stainless Steel Sink	Apartment Features
cmrz5ikg1002vuwvgc3273qu6	Utility Area	Apartment Features
cmrz5ikg2002wuwvgaqemsoqu	Balcony	Apartment Features
cmrz5ikg2002xuwvgztc2w6hw	Dry Balcony	Apartment Features
cmrz5ikg3002yuwvgsnu7ks2s	Vitrified Flooring	Apartment Features
cmrz5ikg3002zuwvg6j3vxear	Anti-skid Bathroom Tiles	Apartment Features
cmrz5ikg40030uwvg40jeids5	Premium Sanitary Ware	Apartment Features
cmrz5ikg50031uwvgj81lgd3f	Concealed Plumbing	Apartment Features
cmrz5ikg50032uwvguiri9obf	Modular Electrical Switches	Apartment Features
cmrz5ikg60033uwvglta6mvjm	TV Point	Apartment Features
cmrz5ikg60034uwvg9uxincyq	AC Point	Apartment Features
cmrz5ikg70035uwvgb1bwat9x	Wi-Fi Point	Apartment Features
cmrz5ikg70036uwvgjc5d1hux	Telephone Point	Apartment Features
cmrz5ikg80037uwvghg5a0ltn	Mosquito Mesh	Apartment Features
cmrz5ikg90038uwvgo19sks1k	Sliding Windows	Apartment Features
cmrz5ikga0039uwvg66uavzd7	Glass Railing	Apartment Features
cmrz5ikga003auwvgkz8luvy2	Premium Paint	Apartment Features
cmrz5ikgb003buwvg9765ncz8	Pet Park	Lifestyle & Special Features
cmrz5ikgb003cuwvgrflg9zli	Temple	Lifestyle & Special Features
cmrz5ikgc003duwvg33ihb332	Sky Garden	Lifestyle & Special Features
cmrz5ikgd003euwvgurg6fk0e	Rooftop Amenities	Lifestyle & Special Features
cmrz5ikgd003fuwvgqrg4sbw9	Viewing Deck	Lifestyle & Special Features
cmrz5ikge003guwvg0w002uff	Organic Farming Area	Lifestyle & Special Features
cmrz5ikge003huwvgz397n6qh	Rainwater Harvesting	Lifestyle & Special Features
cmrz5ikgf003iuwvgt43675v1	Solar Power	Lifestyle & Special Features
cmrz5ikgf003juwvg93lxdmqz	STP	Lifestyle & Special Features
cmrz5ikgg003kuwvg51oobtcv	Waste Management	Lifestyle & Special Features
cmrz5ikgh003luwvgebtlpniz	Dance Academy	Lifestyle & Special Features
cmrz5ikgh003muwvgydk0929g	Sports Academy	Lifestyle & Special Features
cmrz5y0ws0004uw6kgzzn4uw4	Indoor Games Room	Clubhouse & Community
cmrz5y0xo0007uw6kpmv0m3z6	Lounge	Clubhouse & Community
cmrz5y0xw000kuw6kchpl4ty0	Cricket Practice Area	Sports Amenities
cmrz5y0y0000tuw6k5cmnzfk5	Seating Areas	Outdoor & Landscape
cmrz5y0y2000wuw6kzm0d5kyb	Senior Citizen Zone	Outdoor & Landscape
cmrz5y0y80017uw6kro42owef	High-speed Elevators	Convenience
cmrz5y0ya001auw6k3426nuv2	Power Backup (Common Areas)	Convenience
cmrz5y0ye001juw6kssf2ocsh	Premium Vitrified Flooring	Apartment Features
cmrz5y0yj001muw6k8d130b8b	Granite / Solid Surface Kitchen Platform	Apartment Features
cmrz5y0yn001tuw6k1nb4napm	Modular Switches	Apartment Features
cmrz5y0ys0022uw6krvgnobia	Aluminium Sliding Windows	Apartment Features
cmrz5y0yu0027uw6k968osphc	Glass Balcony Railing	Apartment Features
cmrz5y0yy002auw6k9a8001at	Audio Visual Room	Clubhouse & Community
cmrz5y0z0002duw6kt55377ib	Restaurant	Clubhouse & Community
cmrz5y0z2002guw6k1crfvp8h	3 Indoor Party Halls	Clubhouse & Community
cmrz5y0z3002juw6k9g26vq04	10 Guest Rooms	Clubhouse & Community
cmrz5y0z6002ouw6kej19whzq	Children's Adventure Pool	Swimming & Water Features
cmrz5y0zc002zuw6kzvot2xjf	Multipurpose Sports Court	Sports Amenities
cmrz5y0zk003cuw6k041gtnlq	Resting Plazas	Outdoor & Landscape
cmrz5y0zl003fuw6kiegh53rd	Merlion Zone	Outdoor & Landscape
cmrz5y0zn003iuw6kpb3o8nbi	Children's Activity Area	Kids Amenities
cmrz5y0zo003luw6ksxuza2fx	Cycling / Strolling Track	Walking & Wellness
cmrz5y0zq003ouw6kbgtlh5a9	Air-conditioned Homes	Apartment Features
cmrz5y0zt003vuw6kyitfru4a	USB Charging Switches	Apartment Features
cmrz5y105004iuw6kkprtnxgm	Shiamak Davar Institute for Performing Arts	Lifestyle & Special Features
cmrz5y10m004puw6ksnyt9b7g	Quartz Kitchen Platform	Apartment Features
cmrz5y10p004uuw6kllg891gi	Dado Tiles	Apartment Features
cmrz5y10r004xuw6kuw4tclht	Concealed Wiring	Apartment Features
cmrz5y10s0050uw6ko9ggmki8	ISI Modular Switches	Apartment Features
cmrz5y10w0057uw6kuk05tp1i	Fan Point	Apartment Features
cmrz5y10z005cuw6kege15qxg	Wi-Fi Provision	Apartment Features
cmrz5y113005juw6kx68r2mdm	Decorative Window Grills	Apartment Features
cmrz5y115005muw6knosbnxy4	MS Balcony Railing	Apartment Features
cmrz5y118005puw6k667m2q4t	Gypsum Finished Walls	Apartment Features
cmrz5y11c005wuw6k4ylqiur3	Deluxe CP Fittings	Apartment Features
cmrz5y11d005zuw6kb8qfxj2e	Standard Sanitary Ware	Apartment Features
cmrz5y11f0062uw6kqp9gp7f4	Instant Geyser	Apartment Features
cmrz5y11h0067uw6kak91l9na	Technology-based Access Control	Security
cmrz5znh70000uwkgf7113l2v	Large Vitrified Flooring	Apartment Features
cmrz5znhu0003uwkgor7karcw	Premium Solid Surface Kitchen Platform	Apartment Features
cmrz5zni00008uwkgf35vb9vj	Branded Dado Tiles	Apartment Features
cmrz5znia000puwkggadahcl4	Telephone & Wi-Fi Point	Apartment Features
cmrz5znic000suwkg77qj129r	Flush Laminate Doors	Apartment Features
cmrz5znih0011uwkgpcv40vfw	Gypsum Finish Walls	Apartment Features
cmrz5znij0014uwkg6kpdp98b	Premium Eco-friendly Paint	Apartment Features
cmrz5znip001fuwkgipat2ivc	Exhaust Fan	Apartment Features
cmrz5znis001kuwkgit1s4d08	CCTV	Security
cmrz6opl60000uwbsq5tlcfkd	Vitrified Flooring (Living, Dining, Bedroom, Kitchen & Passage)	Apartment Features
cmrz6opn80003uwbs6btfdnxt	Quartz Agglomerated Kitchen Platform with Marble Support	Apartment Features
cmrz6opnd0008uwbspcispz17	Reputed Make Dado Tiles	Apartment Features
cmrz6opnf000buwbspfo1tfgz	Concealed PVC Conduit Wiring	Apartment Features
cmrz6opni000guwbsp7phx4vm	One ELCB per Flat	Apartment Features
cmrz6opnl000juwbsl505vczh	MCB for Each Room	Apartment Features
cmrz6opnq000suwbsigrj537n	Regulator Point	Apartment Features
cmrz6opns000vuwbsyiulekva	Industry Standard Doors	Apartment Features
cmrz6opnu000yuwbsx0qvyofv	Sliding Windows with Engineered Frames	Apartment Features
cmrz6opnv0011uwbsygdoymuv	Clear Glass Windows	Apartment Features
cmrz6opnx0014uwbsdxvj2xat	Decorative MS Window Grills	Apartment Features
cmrz6opnz0017uwbsxlcecsbt	Mosquito Mesh (Living & Bedroom)	Apartment Features
cmrz6opo2001cuwbs952rbd3w	Gypsum Finish Internal Walls	Apartment Features
cmrz6opo5001huwbsngyolsfw	Anti-skid Flooring	Apartment Features
cmrz6opo7001kuwbs5i7o5vhv	Full-height Wall Tiles	Apartment Features
cmrz6opo9001puwbs1q1nee7m	Deluxe CP Brass Fittings	Apartment Features
cmrz6opoe001uuwbsy3y7b5di	3L Instant Geyser	Apartment Features
cmrz6opoh001xuwbsfjuuh3gg	Well Ventilated Bathrooms	Apartment Features
cmrz6wane0000uw3gse5obdv3	Lap Pool	Clubhouse Outdoor Amenities
cmrz6waot0007uw3g9rs8fvz4	Cricket Pitch / Futsal Court	Clubhouse Outdoor Amenities
cmrz6waow000auw3gaqqdae1i	Kiosk	Clubhouse Outdoor Amenities
cmrz6waoy000duw3gyouw0smz	Tropical Planting	Clubhouse Outdoor Amenities
cmrz6wap0000guw3gzb2slicf	Orchard Walk	Clubhouse Outdoor Amenities
cmrz6wap1000juw3geydrhx5k	Outdoor Shower Area	Clubhouse Outdoor Amenities
cmrz6wap3000muw3g3f2c3p2c	Changing Rooms	Clubhouse Outdoor Amenities
cmrz6wap5000puw3g4z88vavt	Gazebo Seating	Clubhouse Outdoor Amenities
cmrz6wap9000wuw3g3iueblbg	Floating Cabana	Clubhouse Outdoor Amenities
cmrz6wapb000zuw3gbnnbwrra	Drop-off for Clubhouse	Clubhouse Outdoor Amenities
cmrz6wapd0012uw3gx93v2fpy	Loungers in Pool	Clubhouse Outdoor Amenities
cmrz6wapg0017uw3g97bj60kn	Building Drop-off	Residential Sector Amenities
cmrz6wapi001auw3gzt2qeel2	Seating Below Trees	Residential Sector Amenities
cmrz6wapj001duw3gsse18u10	Outdoor Gym	Residential Sector Amenities
cmrz6wapl001guw3gldxyt0jn	Interactive Seating	Residential Sector Amenities
cmrz6wapn001juw3gul5sferz	Stepped Planting	Residential Sector Amenities
cmrz6wapp001ouw3ga704weu9	Kids Play Area	Residential Sector Amenities
cmrz6wapr001ruw3glm7ucy3k	Shopping Promenade	Residential Sector Amenities
cmrz6wapt001uuw3g14ehhktg	Parking Area	Residential Sector Amenities
cmrz6wapv001xuw3g37bhv99p	Half Basketball Court	Residential Sector Amenities
cmrz6wapw0020uw3g1h1drsvk	Tennis Court	Residential Sector Amenities
cmrz6wapy0023uw3glrmom0wp	Plaza	Residential Sector Amenities
cmrz6waq00026uw3gc7vz56b7	Senior Citizen Seating	Residential Sector Amenities
cmrz6waq10029uw3gituwyyp3	Focal Sculpture	Residential Sector Amenities
cmrz6waq3002cuw3gw4s8p0re	Stepping Stones	Residential Sector Amenities
cmrz6waq5002fuw3gp9eby9nu	Activity Area	Residential Sector Amenities
cmrz6waq7002iuw3g49r1ebgx	Watchman Cabin	Residential Sector Amenities
cmrz6waqc002puw3gu0yelexv	Walking/Jogging Track	Residential Sector Amenities
cmrz6waqe002suw3g67sth92x	Sculpture	Residential Sector Amenities
cmrz6waqi002xuw3gznzf5wgh	Seating Area	Residential Sector Amenities
cmrz6waqp0036uw3gmi4puwef	Half Baskeball Court	Residential Sector Amenities
cmrz6waqs0039uw3gerbe85h3	Plant Nursery	School Amenities
cmrz6waqv003cuw3grn8yhbrv	VIP Parking	School Amenities
cmrz6war1003fuw3gvu9to9eg	School Bus Drop-off Area	School Amenities
cmrz6war2003iuw3g5zer3jwc	Play Lawn	School Amenities
cmrz6war4003luw3gizrhhyjf	Stage with Mural Wall	School Amenities
cmrz70hh2000cuw90wyjxo1p9	Climbing Wall for Kids'	General
cmrz70hh6000juw906nk1b6o9	BBQ Area with Seating	General
cmrz70hha000ouw90cjxkw9r4	Toddlers Play Area	General
cmrz70hhi000xuw90aewp0y0i	Lounge Seating with Gazebo	General
cmrz70hhk0010uw902yeazj59	Picnic Corner	General
cmrz70hhl0013uw9019yyu14e	Mini Amphitheatre	General
cmrz70hhn0016uw90if0q0fba	Party Lawn	General
cmrz70hhp0019uw90voatr6sx	Pergolas	General
cmrz70hhr001cuw9083qd088q	Garden Planting Area	General
cmrz70hht001fuw90xgxffy1o	Fitness Centre / Gymnasium	General
cmrz70hi0001suw907arlgc19	Multipurpose Open Terrace	General
cmrz72a8m0002uwvcf6b8nit4	Basketball	General
cmrz72a8r0007uwvc9lydqaqd	Hopscotch - play area	General
cmrz72a8x000guwvci8o0q6m1	Skating wall	General
cmrz72a8y000juwvc7gbrhfqp	Resting plaza	General
cmrz72a91000ouwvc426weslz	Lawn area	General
cmrz7757o0000uwegegv2iya0	Arrival deck	General
cmrz775890003uwegdwu79nd6	Entry / Exit	General
cmrz7758c0006uwegcbmeozs3	Driveway	General
cmrz7758f0009uwegn2agfep4	Drop-off zone	General
cmrz7758k000guwegznq49o7u	Cricket pitch	General
cmrz7758l000juwegsovfh1b9	Seating deck	General
cmrz7758s000muwegwlz93f34	Stepped seating	General
cmrz7758v000ruweg8r1uh6h0	Miyawaki area	General
cmrz7758x000uuwegjmtv21yr	Entry to podium	General
cmrz7758y000xuwegw9zrqx98	Pathway	General
cmrz775900010uweghyvyy6kq	The Leisure Deck	General
cmrz775950019uwegm3rt16rr	Reflection pool with sun loungers	General
cmrz77596001cuwegwjxg5pbk	Tot lot	General
cmrz77598001fuwegm6anx9i4	Rock climbing	General
cmrz7759c001muwegydpqyfwf	Infinity edge	General
cmrz7759f001tuweglyrcqiut	Open shower	General
cmrz7759h001wuwegyx5vgd5i	Party deck	General
cmrz7759k0021uweghwwt4gtl	Bar counter	General
cmrz7759l0024uwegzm2ii7ra	Alfresco deck	General
cmrz7759n0027uwegqvs8aszo	Planter	General
cmrz7759o002auweg8h8w8o9d	Health club	General
cmrz7759t002juweg52aka3ue	Conference rooms	General
cmrz7759w002ouweg248jwewl	Kids' game area	General
cmrz7759y002ruweg11xg8tf9	Creche area	General
cmrz7759z002uuweg8axocud6	Banquet	General
cms05798p0002uwxcfvzdtb7g	Lobby Water Feature	General
cms0579b50007uwxc6vmj7jcc	Lounge Pavilion	General
cms0579bc000auwxcb73cv710	Fitness Area	General
cms0579bz000huwxc1kmfzcc8	Cricket Lawn	General
cms0579c9000kuwxcs8r75z3g	Reflexology Trail	General
cms0579cg000nuwxco1tk0g37	25 M Lap Pool with Deck	General
cms0579cl000quwxcjuvhzct4	Shallow Pool with Deck	General
cms0579cp000tuwxcr45tz55z	2 Banquet Halls with Outdoor Deck	General
cms0579cw000wuwxcv1ymtlxu	Aqua Play	General
cms0579d1000zuwxc13nv3yf8	Lawn	General
cms0579d60012uwxcgehjdxcd	Gymnasium with changing room	General
cms0579db0015uwxca0332pzy	Indoor Games Area (Cards, Carrom, Chess, Table Tennis, Foosball, and Pool Table)	General
cms0579di001auwxcvcf5yt5g	BBQ Deck	General
cms0579ds001fuwxco3lin6ot	Star Gazing Deck	General
cms0579dw001iuwxcks21iahi	Rain Water Harvesting	General
cms0579e1001luwxcfuohgcm8	Sewage Treatment Plant (STP)	General
cms0579e5001ouwxc1493x2w9	Organic Waste Converter	General
cms0579eb001ruwxcbskkyool	Solar PV Panels and Solar Street Lights	General
cms0579ef001uuwxca4bm43cn	Daylight-Based Control and LED Fittings	General
cms0579ek001xuwxc9di6egbk	Water Efficient Fixtures	General
cms0579ep0020uwxc3q9rdcma	Low VOC Eco-friendly paints	General
cms0579eu0023uwxc0zmwxv2s	Native Trees used for Landscaping	General
cms0579ey0026uwxcl50pptp1	Natural Ventilation window designs	General
cms0579f30029uwxcrxoejblv	Electric Car Charging Points	General
cms0579f7002cuwxctsaukafz	Differently Abled Access features	General
\.


--
-- Data for Name: BlogPost; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."BlogPost" (id, "authorId", title, slug, "coverImage", content, published, "publishedAt", "createdAt", "updatedAt") FROM stdin;
cms4itlxm0002uwhowjlfqcoi	cmryynzeu0000uw9kvrlfqe8r	The Impact of Upcoming Infrastructure Projects on Mumbai's Real Estate	the-impact-of-upcoming-infrastructure-projects-on-mumbai-s-real-estate	http://localhost:5000/uploads/cover-1785235019177-681830227.jpg	India's financial capital, Mumbai, is undergoing a transformative phase with an array of ambitious infrastructure projects. Poised to reduce travel time, enhance connectivity, and modernize the city's landscape, these developments are making the city an even more attractive urban destination for real estate investment. With the evolution of Mumbai's infrastructure, real estate developments, especially those by renowned developers like Prestige Group, are set to experience a positive impact.\r\nMajor Infrastructure Projects in\r\nMumbai\r\n1. Mumbai Trans-Harbour Link (MTHL): This sea bridge is enabling travel between Sewri in Central Mumbai and Nhava Sheva in Navi Mumbai, significantly minimizing the travel time between these locations. The MTHL has enhanced accessibility and connectivity, thus making Navi Mumbai and nearby regions more desirable for commercial property in Mumbai and surging the demand for apartments for sale in Mumbai.\r\n2. Goregaon-Mulund Link Road (GMLR): The GMLR is a 12.2 km project designed to connect Mumbai's eastern ano western suburbs, specifically linking Coregaon in the west to Mulund in the east. A key feature of this project is the construction of twin tunnels, each approximately 4.7 km long, running beneath the Sanjay Gandhi National Park at depths ranging from 20 to 160 meters. These tunnels aim to significantly reduce travel time between the suburbs, cutting it from over an hour to approximately 15 minutes. For residents of The Prestige City, this development will provide a more direct and efficient route to the western suburbs, enhancing daily commutes and accessibility to various parts of Mumbai.	t	2026-07-28 10:36:34.757	2026-07-28 10:36:34.761	2026-07-28 10:36:59.189
\.


--
-- Data for Name: Lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Lead" (id, "userId", name, phone, type, message, "preferredDate", "preferredSlot", status, "createdAt", "projectId") FROM stdin;
cms4h2c8w005juwkod7ljjxyy	\N	Chetan Naval Sharma	+918080419573	CALLBACK		\N		NEW	2026-07-28 09:47:22.878	cmrz55bod0001uwccft67vh33
cms4huezg0000uwhonh19zfxy	\N	jay	+91 1234567890	CALLBACK	vff	\N	\N	NEW	2026-07-28 10:09:12.79	\N
cms4hytmo0001uwhogg290rj4	\N	jay	+911234567890	SITE_VISIT		\N		NEW	2026-07-28 10:12:38.4	cms05797b0001uwxc0be7qunf
\.


--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Project" (id, title, slug, description, "propertyType", "constructionStatus", "propertyView", "videoUrl", featured, status, "townshipId", "createdAt", "updatedAt", address, "googleMapUrl", latitude, longitude) FROM stdin;
cmrz55bod0001uwccft67vh33	Dosti Willow	dosti-willow	Dosti Willow is a high-rise residential sector within the renowned Dosti West County township in Balkum, Thane West. Offering premium 2 BHK (833 sq. ft.) and 3 BHK (1264 – 1275 sq. ft.) apartments, the project provides a blend of open spaces and modern amenities. Situated close to Grand Central Park, top international schools, and Viviana Mall, it delivers strong social infrastructure along with easy access to major highways and upcoming metro lines. An ideal choice for families and real estate buyers seeking premium township living	APARTMENT	READY_TO_MOVE	NONE		f	ACTIVE	cmryzineo0000uw4sp02svz7v	2026-07-24 16:14:55.829	2026-07-28 09:10:38.176	Dosti West County, Dosti W County Rd, Balkum Pada, Thane West, Thane, Maharashtra 400608	https://maps.app.goo.gl/wtSct3g8afhx3ngr9	19.2212	72.9748
cmryzinnv009euw4smjc2jgcb	Dosti Pine	dosti-pine	Dosti Pine is a premium high-rise residential sector located within the Dosti West County township in Balkum, Thane West. Offering well-planned 2 BHK (approx. 550 – 740 sq. ft.) and 3 BHK (approx. 1050+ sq. ft.) apartments, the project is built for comfortable family living. Located near major commercial zones, top international schools (CP Goenka, EuroSchool), Jupiter Hospital, and Viviana Mall, Dosti Pine blends strong social infrastructure with top-tier recreational amenities and seamless metro and highway connectivity.	APARTMENT	READY_TO_MOVE	NONE		t	ACTIVE	cmryzineo0000uw4sp02svz7v	2026-07-24 13:37:20.203	2026-07-28 09:14:37.518	Dosti Pine, Dosti West County Road, Balkum, Thane West, Maharashtra 400601	https://www.google.com/maps/search/?api=1&query=Dosti+Pine+Dosti+West+County+Road+Balkum+Thane+West+Maharashtra+400601	19.2215	72.976
cmryzinia003kuw4s2gynnavh	Dosti Greater Thane	dosti-greater-thane	Dosti Greater Thane is a large-scale integrated township project by Dosti Realty located in Kalher. The development features well-planned 1 BHK (339 – 393 sq. ft.) and 2 BHK (520 – 552 sq. ft.) homes designed for maximum light, ventilation, and living efficiency. Backed by strong road connectivity to Ghodbunder Road, Eastern Express Highway, and nearby railway stations, it offers complete daily infrastructure alongside world-class recreational facilities.	APARTMENT	READY_TO_MOVE	NONE		t	ACTIVE	\N	2026-07-24 13:37:20.002	2026-07-27 16:51:42.673	Dosti Greater Thane, Near Upcoming Kalher Metro Station, Near S.S. Hospital, Kalher, Thane, Maharashtra 421302	https://www.google.com/maps/search/?api=1&query=Dosti+Greater+Thane+Near+Upcoming+Kalher+Metro+Station+Kalher+Thane+Maharashtra+421302	19.2655	73.076
cmryzinix004cuw4s71gpigmc	Dosti Nest	dosti-nest	Dosti Nest is a multi-tower high-rise residential sector located inside the Dosti West County township in Balkum, Thane West. Offering compact yet space-optimized 1 BHK (288 – 431 sq. ft.) and 2 BHK (519 – 533 sq. ft.) apartments, the project is crafted for urban convenience and comfortable living. Situated close to D-Mart, Kapurbawdi Circle, top international schools, and Viviana Mall, Dosti Nest balances excellent civic infrastructure with rich township recreational facilities.	APARTMENT	READY_TO_MOVE	NONE		t	ACTIVE	cmryzineo0000uw4sp02svz7v	2026-07-24 13:37:20.025	2026-07-25 12:29:49.347	Dosti Nest, Dosti West County, Balkum, Thane West, Maharashtra 400608	https://www.google.com/maps/search/?api=1&query=Dosti+Nest+Dosti+West+County+Balkum+Thane+West+Maharashtra+400608	19.222	72.9755
cmryzinex0002uw4sheqi7453	Dosti 604	dosti-604	Dosti 604 is a newly launched, high-rise residential development by Dosti Realty in Thane West. Featuring expansive 2 BHK (710 – 850 sq. ft.) and 3 BHK (1000 – 1100 sq. ft.) apartments, the project focuses on delivering higher carpet areas and practical spatial design. Surrounded by established social infrastructure including leading hospitals, international schools, and shopping malls, Dosti 604 is an excellent choice for growing families seeking premium urban home	APARTMENT	NEW_LAUNCH	NONE		t	ACTIVE	\N	2026-07-24 13:37:19.88	2026-07-28 09:18:37.644	Plot no.F3 & F3-1, Road No. 22, Wagle Industrial Estate, Thane West, Thane, Maharashtra 400604	https://maps.app.goo.gl/hSZWhQMwKzYZPAbr6	19.0426344	72.8673315
cmryzingn001quw4sn67d2ud0	Dosti Eden	dosti-eden	Dosti Eden is a premium high-rise residential tower located within the Dosti Desire community in Brahmand, Thane West. Offering spacious 2 BHK (650 sq. ft.) and 3 BHK (963 – 1039 sq. ft.) apartments, the project stands out with balcony options and superior construction quality. Positioned close to top schools (Orchids International), hospitals, and retail centers like R-Mall and Viviana Mall, Dosti Eden combines tranquil living with excellent city connectivity.	APARTMENT	READY_TO_MOVE	NONE		t	ACTIVE	\N	2026-07-24 13:37:19.943	2026-07-28 09:17:29.18	Near Orchids International School, One Hiranandani Park, Off Ghodbunder Road, Behind, Brahmand Rd, Thane, Maharashtra 400607	https://maps.app.goo.gl/rHirUEemNCHu2NRb8	19.2648	73.0755
cms05797b0001uwxc0be7qunf	Dosti Mezzo 22	dosti-mezzo-22	Dosti Mezzo 22 is a premium residential project by Dosti Realty situated in Balkum, Thane West. The development features well-planned 2 BHK apartments designed to maximize natural light, ventilation, and living space. Surrounded by top schools, multispecialty hospitals (like Jupiter Hospital), and popular shopping hubs (Viviana Mall), Dosti Mezzo 22 ensures exceptional social infrastructure right at your doorstep. With modern amenities, lush green surroundings, and prime road and upcoming metro connectivity, it offers an ideal home for families and a promising asset for real estate investors.	APARTMENT	READY_TO_MOVE	NONE		t	ACTIVE	cmryzineo0000uw4sp02svz7v	2026-07-25 09:04:12.117	2026-07-28 09:08:30.875	Plot No 103 Next to Dosti Elite, Sion Matunga Estate, Rd Number 29, near Telephone Exchange, Jay BharatMata Nagar, Sion East, Mumbai, Maharashtra 400022	https://maps.app.goo.gl/NrQ7FseNSgneB6QP6	19.043	72.868
cmryzinq300bmuw4s9ui4lu5h	Dosti Planet North	dosti-planet-north	Dosti Planet North is a premier 25-acre township project by Dosti Realty situated in Shilphata. Featuring a selection of 1 BHK, 2 BHK, and 3 BHK apartments, the development is designed to maximize ventilation, natural light, and space utilization. The project boasts excellent social infrastructure with an in-township ICSE school (Dosti Foundation School), health centers, and retail shops nearby. With strong road and railway connectivity to Thane and Navi Mumbai, it is an ideal living destination for modern familie	APARTMENT	READY_TO_MOVE	NONE		t	ACTIVE	\N	2026-07-24 13:37:20.284	2026-07-28 09:14:21.234	Opal A, Dosti Planet N Rd, Dawle Village, Kausa, Shilphata, Navi Mumbai, Thane, Maharashtra 400612	https://maps.app.goo.gl/YpY473f16XxpBkPw7	19.1942	73.0836
cmryzinro00dkuw4so1o919h4	Dosti Tulip	dosti-tulip	Dosti Tulip is a high-rise residential sector within the renowned Dosti West County township in Balkum, Thane West. Featuring efficiently designed 2 BHK (493 – 753 sq. ft.) and 3 BHK (923 sq. ft.) apartments, the project is crafted to offer ample natural light, ventilation, and functional living space. Situated close to top international schools, multispecialty hospitals (Jupiter Hospital), and shopping hubs like Viviana Mall, Dosti Tulip combines strong social infrastructure with world-class clubhouse and outdoor amenities.	APARTMENT	READY_TO_MOVE	NONE		t	ACTIVE	cmryzineo0000uw4sp02svz7v	2026-07-24 13:37:20.341	2026-07-28 09:14:51.858	Dosti Tulip, Balkum Pada, Thane West, Maharashtra 400608	https://www.google.com/maps/search/?api=1&query=Dosti+Tulip+Balkum+Pada+Thane+West+Maharashtra+400608	19.2205	72.9743
cmryzinlw007kuw4s4aqjvsd1	Dosti Olive	dosti-olive	Dosti Olive is a 33-storey high-rise sector in the acclaimed Dosti West County township in Balkum, Thane West. The project offers spacious 2 BHK (628 – 757 sq. ft.) and 3 BHK (949 – 1022 sq. ft.) smart residences featuring efficient space utilization, keyless door entry, and premium fittings. Situated just 1 minute away from EuroSchool and upcoming Metro Line 5, and minutes from Viviana Mall and Jupiter Hospital, Dosti Olive delivers exceptional social infrastructure paired with world-class township amenities.	APARTMENT	UNDER_CONSTRUCTION	NONE		t	ACTIVE	cmryzineo0000uw4sp02svz7v	2026-07-24 13:37:20.133	2026-07-27 16:50:27.649	Dosti Olive, Dosti West County Road, Near Upcoming Balkum Naka Metro Station, Balkum, Thane West, Maharashtra 400601	https://www.google.com/maps/search/?api=1&query=Dosti+Olive+Dosti+West+County+Road+Balkum+Thane+West+Maharashtra+400601	19.2198	72.9751
\.


--
-- Data for Name: ProjectAmenity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProjectAmenity" (id, "projectId", "amenityId", "createdAt") FROM stdin;
cms3gqkle001ouwv08seook39	cmryzinlw007kuw4s4aqjvsd1	cmrz5y0ya001auw6k3426nuv2	2026-07-27 16:50:27.649
cms3gqkle001nuwv0210c4lhy	cmryzinlw007kuw4s4aqjvsd1	cmrz5ikfv002luwvge8bp8er5	2026-07-27 16:50:27.649
cms3gqkle001muwv0cf4nu4c3	cmryzinlw007kuw4s4aqjvsd1	cmrz5ikfu002kuwvgs1vfxg05	2026-07-27 16:50:27.649
cms3gqkle001luwv000iuc8rq	cmryzinlw007kuw4s4aqjvsd1	cmrz5znis001kuwkgit1s4d08	2026-07-27 16:50:27.649
cms3gqkle001kuwv0atgn6tfk	cmryzinlw007kuw4s4aqjvsd1	cmrz5ikfr002fuwvg59faau9q	2026-07-27 16:50:27.649
cms3gqkle001juwv0ir10eb9s	cmryzinlw007kuw4s4aqjvsd1	cmrz5znip001fuwkgipat2ivc	2026-07-27 16:50:27.649
cms3gqkle001iuwv07wvbdzm4	cmryzinlw007kuw4s4aqjvsd1	cmrz5y11f0062uw6kqp9gp7f4	2026-07-27 16:50:27.649
cms3gqkle001huwv0hms16gpw	cmryzinlw007kuw4s4aqjvsd1	cmrz5y11d005zuw6kb8qfxj2e	2026-07-27 16:50:27.649
cms3gqkle001guwv0yfj53y6k	cmryzinlw007kuw4s4aqjvsd1	cmrz5ikg50031uwvgj81lgd3f	2026-07-27 16:50:27.649
cms3gqkle001fuwv0goj2e3yc	cmryzinlw007kuw4s4aqjvsd1	cmrz5ikg3002zuwvg6j3vxear	2026-07-27 16:50:27.649
cms3gqkle001euwv0u12ln1vu	cmryzinlw007kuw4s4aqjvsd1	cmrz5znij0014uwkg6kpdp98b	2026-07-27 16:50:27.649
cms3gqkle001duwv0mmtdywie	cmryzinlw007kuw4s4aqjvsd1	cmrz5znih0011uwkgpcv40vfw	2026-07-27 16:50:27.649
cms3gqkle001cuwv0pbtghvrh	cmryzinlw007kuw4s4aqjvsd1	cmrz5y0yu0027uw6k968osphc	2026-07-27 16:50:27.649
cms3gqkle001buwv03zvbeeqr	cmryzinlw007kuw4s4aqjvsd1	cmrz5ikg80037uwvghg5a0ltn	2026-07-27 16:50:27.649
cms3gqkle001auwv06ifr8nzu	cmryzinlw007kuw4s4aqjvsd1	cmrz5ikg90038uwvgo19sks1k	2026-07-27 16:50:27.649
cms3gqkle0019uwv0ta8x7ral	cmryzinlw007kuw4s4aqjvsd1	cmrz5znic000suwkg77qj129r	2026-07-27 16:50:27.649
cms3gqkle0018uwv0q5z7d8sy	cmryzinlw007kuw4s4aqjvsd1	cmrz5znia000puwkggadahcl4	2026-07-27 16:50:27.649
cms3gqkle0017uwv0f4l3i2iq	cmryzinlw007kuw4s4aqjvsd1	cmrz5ikg60034uwvg9uxincyq	2026-07-27 16:50:27.649
cms3gqkle0016uwv0xibuge3u	cmryzinlw007kuw4s4aqjvsd1	cmrz5ikg60033uwvglta6mvjm	2026-07-27 16:50:27.649
cms3gqkle0015uwv0x09uf2bm	cmryzinlw007kuw4s4aqjvsd1	cmrz5y10r004xuw6kuw4tclht	2026-07-27 16:50:27.649
cms3gqkle0014uwv0y91e8w02	cmryzinlw007kuw4s4aqjvsd1	cmrz5y0zt003vuw6kyitfru4a	2026-07-27 16:50:27.649
cms3gqkle0013uwv0fu5sbytt	cmryzinlw007kuw4s4aqjvsd1	cmrz5ikfs002huwvgm0tm36ik	2026-07-27 16:50:27.649
cms3gqkle0012uwv0d1lk67p8	cmryzinlw007kuw4s4aqjvsd1	cmrz5ikfy002puwvgm3n84sen	2026-07-27 16:50:27.649
cms3gqkle0011uwv0k0qmcfxs	cmryzinlw007kuw4s4aqjvsd1	cmrz5y0zq003ouw6kbgtlh5a9	2026-07-27 16:50:27.649
cms3gqkle0010uwv0vczfw00f	cmryzinlw007kuw4s4aqjvsd1	cmrz5zni00008uwkgf35vb9vj	2026-07-27 16:50:27.649
cms3gqkle000zuwv0p2wpok8f	cmryzinlw007kuw4s4aqjvsd1	cmrz5ikg1002uuwvg8alw7dky	2026-07-27 16:50:27.649
cms3gqkle000yuwv0elgdksw4	cmryzinlw007kuw4s4aqjvsd1	cmrz5znhu0003uwkgor7karcw	2026-07-27 16:50:27.649
cms3gqkld000xuwv0vsxud955	cmryzinlw007kuw4s4aqjvsd1	cmrz5znh70000uwkgf7113l2v	2026-07-27 16:50:27.649
cms4fvv7g0018uwkotxefntqz	cmryzinq300bmuw4s9ui4lu5h	cmrz5ikeo000yuwvggaksdf8f	2026-07-28 09:14:21.234
cms4fvv7g0017uwko5pyh9ymr	cmryzinq300bmuw4s9ui4lu5h	cmrz72a8m0002uwvcf6b8nit4	2026-07-28 09:14:21.234
cms4fvv7g0016uwko4ol2vkq5	cmryzinq300bmuw4s9ui4lu5h	cmrz5ikes0014uwvgprmmr83y	2026-07-28 09:14:21.234
cms4fvv7g0015uwko0ztsaz7f	cmryzinq300bmuw4s9ui4lu5h	cmrz72a8r0007uwvc9lydqaqd	2026-07-28 09:14:21.234
cms4fvv7g0014uwkopux5qawv	cmryzinq300bmuw4s9ui4lu5h	cmrz70hha000ouw90cjxkw9r4	2026-07-28 09:14:21.234
cms4fvv7g0013uwko2k38pfeb	cmryzinq300bmuw4s9ui4lu5h	cmryynzgc0007uw9k21bt32e3	2026-07-28 09:14:21.234
cms4fvv7g0012uwkourwmydvq	cmryzinq300bmuw4s9ui4lu5h	cmryynzgc0008uw9kl0nu76p2	2026-07-28 09:14:21.234
cms4fvv7g0011uwkol6bzdjou	cmryzinq300bmuw4s9ui4lu5h	cmrz72a8x000guwvci8o0q6m1	2026-07-28 09:14:21.234
cms4fvv7g0010uwko7snwlcms	cmryzinq300bmuw4s9ui4lu5h	cmrz72a8y000juwvc7gbrhfqp	2026-07-28 09:14:21.234
cms4fvv7g000zuwko0s8j8ha0	cmryzinq300bmuw4s9ui4lu5h	cmrz6wapj001duw3gsse18u10	2026-07-28 09:14:21.234
cms4fvv79000yuwko7n8c3ppk	cmryzinq300bmuw4s9ui4lu5h	cmrz72a91000ouwvc426weslz	2026-07-28 09:14:21.234
cms4g1d1x005guwkoe79ao4hl	cmryzinex0002uw4sheqi7453	cmrz7759z002uuweg8axocud6	2026-07-28 09:18:37.644
cms4g1d1x005fuwkon5dhakzj	cmryzinex0002uw4sheqi7453	cmrz7759y002ruweg11xg8tf9	2026-07-28 09:18:37.644
cms4g1d1x005euwkogb98lj96	cmryzinex0002uw4sheqi7453	cmrz7759w002ouweg248jwewl	2026-07-28 09:18:37.644
cms4g1d1x005duwko87rnc35t	cmryzinex0002uw4sheqi7453	cmrz5ikdy0002uwvgy65x03ls	2026-07-28 09:18:37.644
cms4g1d1x005cuwkoy3anab2h	cmryzinex0002uw4sheqi7453	cmrz7759t002juweg52aka3ue	2026-07-28 09:18:37.644
cms4g1d1x005buwkoef6cv619	cmryzinex0002uw4sheqi7453	cmrz5ike20005uwvgxang37xt	2026-07-28 09:18:37.644
cms4g1d1x005auwko05cmqjv4	cmryzinex0002uw4sheqi7453	cmrz5ikel000suwvgv1q9j7w1	2026-07-28 09:18:37.644
cms4g1d1x0059uwkorlhqrw20	cmryzinex0002uw4sheqi7453	cmrz5ikej000puwvgkbc75476	2026-07-28 09:18:37.644
cms4g1d1x0058uwkon0z15vyg	cmryzinex0002uw4sheqi7453	cmrz7759o002auweg8h8w8o9d	2026-07-28 09:18:37.644
cms4g1d1x0057uwkogc5f55pv	cmryzinex0002uw4sheqi7453	cmrz7759n0027uwegqvs8aszo	2026-07-28 09:18:37.644
cms4g1d1w0056uwko0fomycc1	cmryzinex0002uw4sheqi7453	cmrz7759l0024uwegzm2ii7ra	2026-07-28 09:18:37.644
cms4g1d1w0055uwko16zqwa9e	cmryzinex0002uw4sheqi7453	cmrz7759k0021uweghwwt4gtl	2026-07-28 09:18:37.644
cms4g1d1w0054uwkoxxssx77a	cmryzinex0002uw4sheqi7453	cmrz70hhn0016uw90if0q0fba	2026-07-28 09:18:37.644
cms4g1d1w0053uwkoij4pbk6e	cmryzinex0002uw4sheqi7453	cmrz7759h001wuwegyx5vgd5i	2026-07-28 09:18:37.644
cms4g1d1w0052uwkoc6efy4eo	cmryzinex0002uw4sheqi7453	cmrz7759f001tuweglyrcqiut	2026-07-28 09:18:37.644
cms4g1d1w0051uwkop7ydykm7	cmryzinex0002uw4sheqi7453	cmryynzg80003uw9kmpdhbol9	2026-07-28 09:18:37.644
cms4g1d1w0050uwkoujjt4kuq	cmryzinex0002uw4sheqi7453	cmryynzg50002uw9klsvlg5yc	2026-07-28 09:18:37.644
cms4g1d1w004zuwkodvbc7ud0	cmryzinex0002uw4sheqi7453	cmrz7759c001muwegydpqyfwf	2026-07-28 09:18:37.644
cms4g1d1w004yuwko6sc28ucb	cmryzinex0002uw4sheqi7453	cmrz6wane0000uw3gse5obdv3	2026-07-28 09:18:37.644
cms4g1d1w004xuwko348ef0yf	cmryzinex0002uw4sheqi7453	cmryynzgd0009uw9knaf7urp7	2026-07-28 09:18:37.644
cms4g1d1w004wuwko8s2yb7v3	cmryzinex0002uw4sheqi7453	cmrz77598001fuwegm6anx9i4	2026-07-28 09:18:37.644
cms4g1d1w004vuwkoqcjitizp	cmryzinex0002uw4sheqi7453	cmrz77596001cuwegwjxg5pbk	2026-07-28 09:18:37.644
cms4g1d1w004uuwkoss9gwf42	cmryzinex0002uw4sheqi7453	cmrz775950019uwegm3rt16rr	2026-07-28 09:18:37.644
cms4g1d1w004tuwko420wf92g	cmryzinex0002uw4sheqi7453	cmryynzgc0008uw9kl0nu76p2	2026-07-28 09:18:37.644
cms07jfpd0093uw6gjwgq1ebb	cmryzinix004cuw4s71gpigmc	cmrz6opoh001xuwbsfjuuh3gg	2026-07-25 10:09:39.642
cms07jfpd0092uw6g5d6pjp7u	cmryzinix004cuw4s71gpigmc	cmrz6opoe001uuwbsy3y7b5di	2026-07-25 10:09:39.642
cms07jfpd0091uw6guhzihktq	cmryzinix004cuw4s71gpigmc	cmrz5y11d005zuw6kb8qfxj2e	2026-07-25 10:09:39.642
cms07jfpd0090uw6ge2eumqp9	cmryzinix004cuw4s71gpigmc	cmrz6opo9001puwbs1q1nee7m	2026-07-25 10:09:39.642
cms07jfpc008zuw6gcp1de9h4	cmryzinix004cuw4s71gpigmc	cmrz5ikg50031uwvgj81lgd3f	2026-07-25 10:09:39.642
cms07jfpc008yuw6gqjfohdyg	cmryzinix004cuw4s71gpigmc	cmrz6opo7001kuwbs5i7o5vhv	2026-07-25 10:09:39.642
cms07jfpc008xuw6gf50hbn7l	cmryzinix004cuw4s71gpigmc	cmrz6opo5001huwbsngyolsfw	2026-07-25 10:09:39.642
cms07jfpc008wuw6gqyufcvk1	cmryzinix004cuw4s71gpigmc	cmrz5znij0014uwkg6kpdp98b	2026-07-25 10:09:39.642
cms07jfpc008vuw6gqqt81pfz	cmryzinix004cuw4s71gpigmc	cmrz6opo2001cuwbs952rbd3w	2026-07-25 10:09:39.642
cms07jfpc008uuw6gv1pjo6ah	cmryzinix004cuw4s71gpigmc	cmrz5y115005muw6knosbnxy4	2026-07-25 10:09:39.642
cms07jfpc008tuw6g4c3u61zg	cmryzinix004cuw4s71gpigmc	cmrz6opnz0017uwbsxlcecsbt	2026-07-25 10:09:39.642
cms07jfpc008suw6gtc7s64qf	cmryzinix004cuw4s71gpigmc	cmrz6opnx0014uwbsdxvj2xat	2026-07-25 10:09:39.642
cms07jfpc008ruw6g9m9yygwc	cmryzinix004cuw4s71gpigmc	cmrz6opnv0011uwbsygdoymuv	2026-07-25 10:09:39.642
cms07jfpc008quw6g5h1w81il	cmryzinix004cuw4s71gpigmc	cmrz6opnu000yuwbsx0qvyofv	2026-07-25 10:09:39.642
cms07jfpc008puw6g5r844rz6	cmryzinix004cuw4s71gpigmc	cmrz6opns000vuwbsyiulekva	2026-07-25 10:09:39.642
cms07jfpc008ouw6gukd7hs7t	cmryzinix004cuw4s71gpigmc	cmrz6opnq000suwbsigrj537n	2026-07-25 10:09:39.642
cms07jfpc008nuw6gxzhud7ru	cmryzinix004cuw4s71gpigmc	cmrz5y10w0057uw6kuk05tp1i	2026-07-25 10:09:39.642
cms07jfpc008muw6guice32oz	cmryzinix004cuw4s71gpigmc	cmrz5ikg60034uwvg9uxincyq	2026-07-25 10:09:39.642
cms07jfpb008luw6gs0fch27y	cmryzinix004cuw4s71gpigmc	cmrz5ikg60033uwvglta6mvjm	2026-07-25 10:09:39.642
cms07jfpb008kuw6ggjtcc8f5	cmryzinix004cuw4s71gpigmc	cmrz6opnl000juwbsl505vczh	2026-07-25 10:09:39.642
cms07jfpb008juw6g2huix0kj	cmryzinix004cuw4s71gpigmc	cmrz6opni000guwbsp7phx4vm	2026-07-25 10:09:39.642
cms07jfpb008iuw6grjo2qhf6	cmryzinix004cuw4s71gpigmc	cmrz5y10s0050uw6ko9ggmki8	2026-07-25 10:09:39.642
cms07jfpb008huw6gnl7gzjkc	cmryzinix004cuw4s71gpigmc	cmrz6opnf000buwbspfo1tfgz	2026-07-25 10:09:39.642
cms07jfpb008guw6g998ccixl	cmryzinix004cuw4s71gpigmc	cmrz6opnd0008uwbspcispz17	2026-07-25 10:09:39.642
cms07jfpb008fuw6gx1dk3aoy	cmryzinix004cuw4s71gpigmc	cmrz5ikg1002uuwvg8alw7dky	2026-07-25 10:09:39.642
cms07jfpb008euw6gy8gjtm5w	cmryzinix004cuw4s71gpigmc	cmrz6opn80003uwbs6btfdnxt	2026-07-25 10:09:39.642
cms07jfpb008duw6giiernp0n	cmryzinix004cuw4s71gpigmc	cmrz6opl60000uwbsq5tlcfkd	2026-07-25 10:09:39.642
cms4fw7s10029uwkol41guvtc	cmryzinnv009euw4smjc2jgcb	cmrz5y0zk003cuw6k041gtnlq	2026-07-28 09:14:37.518
cms4fw7s10028uwko5dni7r2y	cmryzinnv009euw4smjc2jgcb	cmrz5y0zl003fuw6kiegh53rd	2026-07-28 09:14:37.518
cms4fw7s10027uwkors6lllbk	cmryzinnv009euw4smjc2jgcb	cmrz5y0zn003iuw6kpb3o8nbi	2026-07-28 09:14:37.518
cms4fw7s10026uwkom6yvcm6y	cmryzinnv009euw4smjc2jgcb	cmrz5y0zo003luw6ksxuza2fx	2026-07-28 09:14:37.518
cms4fw7s10025uwko98bw9ovv	cmryzinnv009euw4smjc2jgcb	cmrz5y0zq003ouw6kbgtlh5a9	2026-07-28 09:14:37.518
cms4fw7s10024uwkorfbj3y2v	cmryzinnv009euw4smjc2jgcb	cmrz5ikfy002puwvgm3n84sen	2026-07-28 09:14:37.518
cms4fw7s10023uwko9n99e73j	cmryzinnv009euw4smjc2jgcb	cmrz5ikfs002huwvgm0tm36ik	2026-07-28 09:14:37.518
cms4fw7ry0022uwkompxajr6m	cmryzinnv009euw4smjc2jgcb	cmrz5y0zt003vuw6kyitfru4a	2026-07-28 09:14:37.518
cms4fw7ry0021uwkokyl8kb6o	cmryzinnv009euw4smjc2jgcb	cmrz5ikg0002tuwvgp2nts36k	2026-07-28 09:14:37.518
cms4fw7ry0020uwkov547239p	cmryzinnv009euw4smjc2jgcb	cmrz5ikg1002uuwvg8alw7dky	2026-07-28 09:14:37.518
cms4fw7ry001zuwko5wz6n3c9	cmryzinnv009euw4smjc2jgcb	cmrz5ikg3002yuwvgsnu7ks2s	2026-07-28 09:14:37.518
cms4fw7ry001yuwkomfi0okq7	cmryzinnv009euw4smjc2jgcb	cmrz5y0yu0027uw6k968osphc	2026-07-28 09:14:37.518
cms4fw7rx001xuwkooedxsrav	cmryzinnv009euw4smjc2jgcb	cmrz5ikg90038uwvgo19sks1k	2026-07-28 09:14:37.518
cms4fw7rx001wuwkou0b9rxdw	cmryzinnv009euw4smjc2jgcb	cmrz5ikg80037uwvghg5a0ltn	2026-07-28 09:14:37.518
cms4fw7rx001vuwko5gqe3y29	cmryzinnv009euw4smjc2jgcb	cmrz5ikg60033uwvglta6mvjm	2026-07-28 09:14:37.518
cms4fw7rx001uuwkoe81glpab	cmryzinnv009euw4smjc2jgcb	cmrz5ikg60034uwvg9uxincyq	2026-07-28 09:14:37.518
cms4fw7rx001tuwko5gjcinzj	cmryzinnv009euw4smjc2jgcb	cmrz5ikg70035uwvgb1bwat9x	2026-07-28 09:14:37.518
cms4fw7rx001suwkof5xmwm1n	cmryzinnv009euw4smjc2jgcb	cmrz5ikg70036uwvgjc5d1hux	2026-07-28 09:14:37.518
cms4fw7rx001ruwkovfd8togm	cmryzinnv009euw4smjc2jgcb	cmrz5y105004iuw6kkprtnxgm	2026-07-28 09:14:37.518
cms3gs6hd0038uwv0bzwhdfvd	cmryzinia003kuw4s2gynnavh	cmrz6waqp0036uw3gmi4puwef	2026-07-27 16:51:42.673
cms3gs6hd0037uwv0v5kfs4lm	cmryzinia003kuw4s2gynnavh	cmrz6wap5000puw3g4z88vavt	2026-07-27 16:51:42.673
cms3gs6hd0036uwv0grzs1b84	cmryzinia003kuw4s2gynnavh	cmrz5ikew001auwvg3nhlj6xa	2026-07-27 16:51:42.673
cms3gs6hd0035uwv0mitgvnkt	cmryzinia003kuw4s2gynnavh	cmryynzgc0008uw9kl0nu76p2	2026-07-27 16:51:42.673
cms3gs6hd0034uwv0ftmyve8g	cmryzinia003kuw4s2gynnavh	cmrz6waqi002xuw3gznzf5wgh	2026-07-27 16:51:42.673
cms3gs6hd0033uwv0fc56jhfb	cmryzinia003kuw4s2gynnavh	cmrz5ikfe001wuwvgtes28kdj	2026-07-27 16:51:42.673
cms3gs6hd0032uwv0wnkmny7b	cmryzinia003kuw4s2gynnavh	cmrz6waqe002suw3g67sth92x	2026-07-27 16:51:42.673
cms3gs6hd0031uwv06i29vjtm	cmryzinia003kuw4s2gynnavh	cmrz6waqc002puw3gu0yelexv	2026-07-27 16:51:42.673
cms3gs6hd0030uwv09fx1d4o7	cmryzinia003kuw4s2gynnavh	cmrz5ikep0010uwvg3d9cat99	2026-07-27 16:51:42.673
cms3gs6hd002zuwv0v32huufh	cmryzinia003kuw4s2gynnavh	cmrz5ikex001buwvg9g7w3163	2026-07-27 16:51:42.673
cms3gs6hd002yuwv0c7nirx8i	cmryzinia003kuw4s2gynnavh	cmrz6waq7002iuw3g49r1ebgx	2026-07-27 16:51:42.673
cms3gs6hd002xuwv03wh1dnyi	cmryzinia003kuw4s2gynnavh	cmrz6waq5002fuw3gp9eby9nu	2026-07-27 16:51:42.673
cms3gs6hd002wuwv0nt22kcrk	cmryzinia003kuw4s2gynnavh	cmrz6waq3002cuw3gw4s8p0re	2026-07-27 16:51:42.673
cms3gs6hd002vuwv06txrprte	cmryzinia003kuw4s2gynnavh	cmrz6waq10029uw3gituwyyp3	2026-07-27 16:51:42.673
cms3gs6hd002uuwv0mexxcic4	cmryzinia003kuw4s2gynnavh	cmrz6waq00026uw3gc7vz56b7	2026-07-27 16:51:42.673
cms3gs6hd002tuwv00wcgp4q1	cmryzinia003kuw4s2gynnavh	cmrz6wapy0023uw3glrmom0wp	2026-07-27 16:51:42.673
cms3gs6hd002suwv0darcjdrt	cmryzinia003kuw4s2gynnavh	cmrz6wapw0020uw3g1h1drsvk	2026-07-27 16:51:42.673
cms3gs6hd002ruwv02niquh4e	cmryzinia003kuw4s2gynnavh	cmrz6wapv001xuw3g37bhv99p	2026-07-27 16:51:42.673
cms3gs6hd002quwv0ke5iulrc	cmryzinia003kuw4s2gynnavh	cmrz6wapt001uuw3g14ehhktg	2026-07-27 16:51:42.673
cms3gs6hd002puwv03pzm223z	cmryzinia003kuw4s2gynnavh	cmrz6wapr001ruw3glm7ucy3k	2026-07-27 16:51:42.673
cms3gs6hd002ouwv0nbdgvonq	cmryzinia003kuw4s2gynnavh	cmrz6wapp001ouw3ga704weu9	2026-07-27 16:51:42.673
cms3gs6hd002nuwv01hkc3v26	cmryzinia003kuw4s2gynnavh	cmrz5ikgb003cuwvgrflg9zli	2026-07-27 16:51:42.673
cms3gs6hd002muwv053r5t44j	cmryzinia003kuw4s2gynnavh	cmrz6wapn001juw3gul5sferz	2026-07-27 16:51:42.673
cms3gs6hd002luwv0txp6e8lz	cmryzinia003kuw4s2gynnavh	cmrz6wapl001guw3gldxyt0jn	2026-07-27 16:51:42.673
cms3gs6hd002kuwv0zxdjrbjl	cmryzinia003kuw4s2gynnavh	cmrz6wapj001duw3gsse18u10	2026-07-27 16:51:42.673
cms3gs6hd002juwv09db24kr1	cmryzinia003kuw4s2gynnavh	cmrz6wapi001auw3gzt2qeel2	2026-07-27 16:51:42.673
cms3gs6hd002iuwv03zke1hqr	cmryzinia003kuw4s2gynnavh	cmrz6wapg0017uw3g97bj60kn	2026-07-27 16:51:42.673
cms3gs6hd002huwv09pianbtk	cmryzinia003kuw4s2gynnavh	cmryynzgc0007uw9k21bt32e3	2026-07-27 16:51:42.673
cms3gs6hd002guwv0t53usebk	cmryzinia003kuw4s2gynnavh	cmrz6wapd0012uw3gx93v2fpy	2026-07-27 16:51:42.673
cms3gs6hd002fuwv0y5jgcjcp	cmryzinia003kuw4s2gynnavh	cmrz6wapb000zuw3gbnnbwrra	2026-07-27 16:51:42.673
cms3gs6hd002euwv0cvnnlppz	cmryzinia003kuw4s2gynnavh	cmrz6wap9000wuw3g3iueblbg	2026-07-27 16:51:42.673
cms3gs6hd002duwv0lxrrjrwc	cmryzinia003kuw4s2gynnavh	cmryynzg80003uw9kmpdhbol9	2026-07-27 16:51:42.673
cms3gs6hd002cuwv0zm047pyv	cmryzinia003kuw4s2gynnavh	cmrz5ikew001auwvg3nhlj6xa	2026-07-27 16:51:42.673
cms3gs6hd002buwv0d4cve4ym	cmryzinia003kuw4s2gynnavh	cmrz6wap5000puw3g4z88vavt	2026-07-27 16:51:42.673
cms3gs6hd002auwv0plopzb1q	cmryzinia003kuw4s2gynnavh	cmrz6wap3000muw3g3f2c3p2c	2026-07-27 16:51:42.673
cms3gs6hd0029uwv0i2slxcqq	cmryzinia003kuw4s2gynnavh	cmrz6wap1000juw3geydrhx5k	2026-07-27 16:51:42.673
cms3gs6hd0028uwv03qf890b2	cmryzinia003kuw4s2gynnavh	cmrz6wap0000guw3gzb2slicf	2026-07-27 16:51:42.673
cms4fw7rx001quwkolrk49chm	cmryzinnv009euw4smjc2jgcb	cmrz5y0yy002auw6k9a8001at	2026-07-28 09:14:37.518
cms4fw7rx001puwkop1bcqsi1	cmryzinnv009euw4smjc2jgcb	cmrz5y0z0002duw6kt55377ib	2026-07-28 09:14:37.518
cms4fw7rx001ouwkoyfn9sc6z	cmryzinnv009euw4smjc2jgcb	cmrz5y0z2002guw6k1crfvp8h	2026-07-28 09:14:37.518
cms4fw7rx001nuwkodzabo2qc	cmryzinnv009euw4smjc2jgcb	cmrz5y0z3002juw6k9g26vq04	2026-07-28 09:14:37.518
cms4fw7rx001muwkobkqorx88	cmryzinnv009euw4smjc2jgcb	cmrz5ike9000euwvg68cpm2zg	2026-07-28 09:14:37.518
cms4fw7rx001luwko02urotwk	cmryzinnv009euw4smjc2jgcb	cmrz5y0z6002ouw6kej19whzq	2026-07-28 09:14:37.518
cms4fw7rx001kuwko3dyptw4x	cmryzinnv009euw4smjc2jgcb	cmrz5ikeg000luwvg76ei363c	2026-07-28 09:14:37.518
cms4fw7rx001juwko7eyu64vn	cmryzinnv009euw4smjc2jgcb	cmrz5ikeb000iuwvgausjbb5d	2026-07-28 09:14:37.518
cms4fw7rx001iuwkomxs3dl4g	cmryzinnv009euw4smjc2jgcb	cmrz5ikec000juwvgyp0zxoi0	2026-07-28 09:14:37.518
cms4fw7rx001huwkosuw3tjdd	cmryzinnv009euw4smjc2jgcb	cmrz5ikei000ouwvgd4pkebn0	2026-07-28 09:14:37.518
cms4fw7rx001guwkoilka2n4t	cmryzinnv009euw4smjc2jgcb	cmrz5y0zc002zuw6kzvot2xjf	2026-07-28 09:14:37.518
cms4fw7rx001fuwkooxlcqeth	cmryzinnv009euw4smjc2jgcb	cmrz5ikeq0012uwvg56epsbnj	2026-07-28 09:14:37.518
cms4fw7rx001euwko29ejltm9	cmryzinnv009euw4smjc2jgcb	cmrz5ikes0014uwvgprmmr83y	2026-07-28 09:14:37.518
cms3gs6hd0027uwv0wyg80ey6	cmryzinia003kuw4s2gynnavh	cmrz6waoy000duw3gyouw0smz	2026-07-27 16:51:42.673
cms3gs6hd0026uwv0vg9aub2l	cmryzinia003kuw4s2gynnavh	cmrz6waow000auw3gaqqdae1i	2026-07-27 16:51:42.673
cms3gs6hd0025uwv0q12ue3te	cmryzinia003kuw4s2gynnavh	cmrz6waot0007uw3g9rs8fvz4	2026-07-27 16:51:42.673
cms4g1d1v004suwkoj86gofef	cmryzinex0002uw4sheqi7453	cmrz5ikeb000iuwvgausjbb5d	2026-07-28 09:18:37.644
cms4g1d1v004ruwkou6jbhf1o	cmryzinex0002uw4sheqi7453	cmryynzgc0007uw9k21bt32e3	2026-07-28 09:18:37.644
cms4g1d1v004quwkog809upry	cmryzinex0002uw4sheqi7453	cmrz775900010uweghyvyy6kq	2026-07-28 09:18:37.644
cms4g1d1v004puwkoy4qy57d9	cmryzinex0002uw4sheqi7453	cmrz7758y000xuwegw9zrqx98	2026-07-28 09:18:37.644
cms4g1d1v004ouwkodanmdjfp	cmryzinex0002uw4sheqi7453	cmrz7758x000uuwegjmtv21yr	2026-07-28 09:18:37.644
cms4g1d1v004nuwkov71p35xq	cmryzinex0002uw4sheqi7453	cmrz7758v000ruweg8r1uh6h0	2026-07-28 09:18:37.644
cms4g1d1v004muwkowvg0qm3f	cmryzinex0002uw4sheqi7453	cmrz5ikft002iuwvgwrgtvfe5	2026-07-28 09:18:37.644
cms4g1d1u004luwko20nfk6bq	cmryzinex0002uw4sheqi7453	cmrz7758s000muwegwlz93f34	2026-07-28 09:18:37.644
cms4g1d1u004kuwko7ov2ubm7	cmryzinex0002uw4sheqi7453	cmrz7758l000juwegsovfh1b9	2026-07-28 09:18:37.644
cms4g1d1u004juwkoiutas94f	cmryzinex0002uw4sheqi7453	cmrz7758k000guwegznq49o7u	2026-07-28 09:18:37.644
cms4g1d1u004iuwkoe3qcb52k	cmryzinex0002uw4sheqi7453	cmrz5iket0016uwvgir7vnkm8	2026-07-28 09:18:37.644
cms4g1d1u004huwko4m96ibb9	cmryzinex0002uw4sheqi7453	cmrz6waqe002suw3g67sth92x	2026-07-28 09:18:37.644
cms4g1d1u004guwkoqfy3gzd4	cmryzinex0002uw4sheqi7453	cmrz7758f0009uwegn2agfep4	2026-07-28 09:18:37.644
cms4g1d1u004fuwkoqlo23wfg	cmryzinex0002uw4sheqi7453	cmrz7758c0006uwegcbmeozs3	2026-07-28 09:18:37.644
cms4g1d1u004euwkon8rtprsy	cmryzinex0002uw4sheqi7453	cmrz775890003uwegdwu79nd6	2026-07-28 09:18:37.644
cms4g1d1q004duwko5e3sv3c9	cmryzinex0002uw4sheqi7453	cmrz7757o0000uwegegv2iya0	2026-07-28 09:18:37.644
cms4fw7rx001duwkob1if0o7g	cmryzinnv009euw4smjc2jgcb	cmrz5ikes0015uwvgvhal4sj9	2026-07-28 09:14:37.518
cms4fw7rw001cuwko7cx80k7m	cmryzinnv009euw4smjc2jgcb	cmrz5ikex001buwvg9g7w3163	2026-07-28 09:14:37.518
cms4fw7rq001buwkomwiac6a7	cmryzinnv009euw4smjc2jgcb	cmrz5ikew001auwvg3nhlj6xa	2026-07-28 09:14:37.518
cms3gs6hd0024uwv0oagvvupj	cmryzinia003kuw4s2gynnavh	cmrz5ikeb000iuwvgausjbb5d	2026-07-27 16:51:42.673
cms3gs6hd0023uwv0h6lugbyd	cmryzinia003kuw4s2gynnavh	cmrz5ikea000guwvggmdhnhhu	2026-07-27 16:51:42.673
cms3gs6hd0022uwv0v90h3yk7	cmryzinia003kuw4s2gynnavh	cmrz6wane0000uw3gse5obdv3	2026-07-27 16:51:42.673
cms3gs6hd0021uwv09oz4ml6c	cmryzinia003kuw4s2gynnavh	cmrz6war4003luw3gizrhhyjf	2026-07-27 16:51:42.673
cms3gs6hd0020uwv0gmryjr3p	cmryzinia003kuw4s2gynnavh	cmrz6war2003iuw3g5zer3jwc	2026-07-27 16:51:42.673
cms3gs6hd001zuwv0tekud7v3	cmryzinia003kuw4s2gynnavh	cmrz6war1003fuw3gvu9to9eg	2026-07-27 16:51:42.673
cms3gs6hd001yuwv0mtqj1pwg	cmryzinia003kuw4s2gynnavh	cmrz6waqv003cuw3grn8yhbrv	2026-07-27 16:51:42.673
cms3gs6hd001xuwv07rb7fslv	cmryzinia003kuw4s2gynnavh	cmrz6waqs0039uw3gerbe85h3	2026-07-27 16:51:42.673
cms4fwitw003auwko5y1zpcim	cmryzinro00dkuw4so1o919h4	cmrz5y0yu0027uw6k968osphc	2026-07-28 09:14:51.858
cms4fwitw0039uwkoy2udd2g2	cmryzinro00dkuw4so1o919h4	cmrz5ikg80037uwvghg5a0ltn	2026-07-28 09:14:51.858
cms4fwitv0038uwkockj90ajt	cmryzinro00dkuw4so1o919h4	cmrz5y0ys0022uw6krvgnobia	2026-07-28 09:14:51.858
cms4fwitv0037uwko515uqsgt	cmryzinro00dkuw4so1o919h4	cmrz5ikg60034uwvg9uxincyq	2026-07-28 09:14:51.858
cms4fwitv0036uwko0msjfxvz	cmryzinro00dkuw4so1o919h4	cmrz5ikg70036uwvgjc5d1hux	2026-07-28 09:14:51.858
cms4fwitv0035uwkoq5hlhvol	cmryzinro00dkuw4so1o919h4	cmrz5ikg60033uwvglta6mvjm	2026-07-28 09:14:51.858
cms4fwitv0034uwkopzmsyznl	cmryzinro00dkuw4so1o919h4	cmrz5y0yn001tuw6k1nb4napm	2026-07-28 09:14:51.858
cms4fwitv0033uwkokhjz4aow	cmryzinro00dkuw4so1o919h4	cmrz5ikg1002vuwvgc3273qu6	2026-07-28 09:14:51.858
cms4fwitv0032uwko8ynkmrco	cmryzinro00dkuw4so1o919h4	cmrz5ikg1002uuwvg8alw7dky	2026-07-28 09:14:51.858
cms4fwitv0031uwkofh3m0lcs	cmryzinro00dkuw4so1o919h4	cmrz5y0yj001muw6k8d130b8b	2026-07-28 09:14:51.858
cms4fwitv0030uwkofh1os1xn	cmryzinro00dkuw4so1o919h4	cmrz5y0ye001juw6kssf2ocsh	2026-07-28 09:14:51.858
cms4fwitv002zuwkoxpg9kpo6	cmryzinro00dkuw4so1o919h4	cmrz5ikfs002huwvgm0tm36ik	2026-07-28 09:14:51.858
cms4fwitv002yuwkolrvdgaxv	cmryzinro00dkuw4so1o919h4	cmrz5ikfy002puwvgm3n84sen	2026-07-28 09:14:51.858
cms4fwitv002xuwkomszbq803	cmryzinro00dkuw4so1o919h4	cmrz5ikfu002kuwvgs1vfxg05	2026-07-28 09:14:51.858
cms4fwitv002wuwkoqaxfg9a5	cmryzinro00dkuw4so1o919h4	cmrz5y0ya001auw6k3426nuv2	2026-07-28 09:14:51.858
cms4fwitv002vuwkoigkgngrx	cmryzinro00dkuw4so1o919h4	cmrz5y0y80017uw6kro42owef	2026-07-28 09:14:51.858
cms4fwitv002uuwkobami6qvn	cmryzinro00dkuw4so1o919h4	cmrz5ikfq002euwvgf34g7rvu	2026-07-28 09:14:51.858
cms4fwitv002tuwkosfth8idw	cmryzinro00dkuw4so1o919h4	cmrz5ikf8001tuwvg6rj2e6qh	2026-07-28 09:14:51.858
cms4fwitv002suwkon2683rm9	cmryzinro00dkuw4so1o919h4	cmrz5ikf7001ruwvgw1co6qo1	2026-07-28 09:14:51.858
cms4fwitv002ruwkokt8mi4fb	cmryzinro00dkuw4so1o919h4	cmrz5ikf3001kuwvgicn0abyi	2026-07-28 09:14:51.858
cms4fwitv002quwkoa22c7x6l	cmryzinro00dkuw4so1o919h4	cmrz5y0y2000wuw6kzm0d5kyb	2026-07-28 09:14:51.858
cms4fwitv002puwko19a3ym4b	cmryzinro00dkuw4so1o919h4	cmrz5y0y0000tuw6k5cmnzfk5	2026-07-28 09:14:51.858
cms4fwitv002ouwko1aogo7yp	cmryzinro00dkuw4so1o919h4	cmrz5ikex001buwvg9g7w3163	2026-07-28 09:14:51.858
cms4fwitv002nuwkothyfde5w	cmryzinro00dkuw4so1o919h4	cmrz5ikeu0017uwvg1ic8388x	2026-07-28 09:14:51.858
cms4fwitv002muwkorjdo479q	cmryzinro00dkuw4so1o919h4	cmrz5ikel000suwvgv1q9j7w1	2026-07-28 09:14:51.858
cms4fwitv002luwkonli3nqdf	cmryzinro00dkuw4so1o919h4	cmrz5y0xw000kuw6kchpl4ty0	2026-07-28 09:14:51.858
cms4fwitv002kuwko73jctuxj	cmryzinro00dkuw4so1o919h4	cmrz5ikeq0011uwvg4fulhwis	2026-07-28 09:14:51.858
cms4fwitv002juwko2tb8k7jf	cmryzinro00dkuw4so1o919h4	cmrz5ikei000ouwvgd4pkebn0	2026-07-28 09:14:51.858
cms4fwitv002iuwkogvkkejfe	cmryzinro00dkuw4so1o919h4	cmrz5ikea000guwvggmdhnhhu	2026-07-28 09:14:51.858
cms4fwitv002huwko153c2zqe	cmryzinro00dkuw4so1o919h4	cmrz5ike8000duwvg0r9w8ccn	2026-07-28 09:14:51.858
cms4fwitv002guwkon061pevc	cmryzinro00dkuw4so1o919h4	cmryynzgi000huw9kq26jnpei	2026-07-28 09:14:51.858
cms4fwitv002fuwko8czwpwj6	cmryzinro00dkuw4so1o919h4	cmrz5y0xo0007uw6kpmv0m3z6	2026-07-28 09:14:51.858
cms4fwitv002euwkozhke7l5s	cmryzinro00dkuw4so1o919h4	cmrz5y0ws0004uw6kgzzn4uw4	2026-07-28 09:14:51.858
cms4fwitv002duwkocvjs0pdu	cmryzinro00dkuw4so1o919h4	cmrz5ikdy0002uwvgy65x03ls	2026-07-28 09:14:51.858
cms4fwitv002cuwkoz82m3z93	cmryzinro00dkuw4so1o919h4	cmrz5ikbm0000uwvghr1vmgcu	2026-07-28 09:14:51.858
cms4fzw85004auwkoqqjr2cm2	cmryzingn001quw4sn67d2ud0	cmrz70hi0001suw907arlgc19	2026-07-28 09:17:29.18
cms4fzw850049uwkokzbymd69	cmryzingn001quw4sn67d2ud0	cmryynzgh000fuw9k9f5ssiqz	2026-07-28 09:17:29.18
cms4fzw850048uwkoxc4rt2bs	cmryzingn001quw4sn67d2ud0	cmryynzgg000euw9kow6bsf6x	2026-07-28 09:17:29.18
cms4fzw850047uwkovwpfoscl	cmryzingn001quw4sn67d2ud0	cmryynzgi000huw9kq26jnpei	2026-07-28 09:17:29.18
cms4fzw850046uwko98zc4yto	cmryzingn001quw4sn67d2ud0	cmrz5ikel000suwvgv1q9j7w1	2026-07-28 09:17:29.18
cms4fzw850045uwkojus3er69	cmryzingn001quw4sn67d2ud0	cmryynzgi000guw9k58ocetgc	2026-07-28 09:17:29.18
cms4fzw850044uwkokprwqgz8	cmryzingn001quw4sn67d2ud0	cmrz70hht001fuw90xgxffy1o	2026-07-28 09:17:29.18
cms4fzw850043uwkotbvqusfi	cmryzingn001quw4sn67d2ud0	cmrz70hhr001cuw9083qd088q	2026-07-28 09:17:29.18
cms4fzw850042uwko6nimeecm	cmryzingn001quw4sn67d2ud0	cmrz70hhp0019uw90voatr6sx	2026-07-28 09:17:29.18
cms4fzw850041uwkotrnqou6r	cmryzingn001quw4sn67d2ud0	cmrz70hhn0016uw90if0q0fba	2026-07-28 09:17:29.18
cms4fzw850040uwkoq5ddrvkj	cmryzingn001quw4sn67d2ud0	cmrz70hhl0013uw9019yyu14e	2026-07-28 09:17:29.18
cms4fzw85003zuwkoug1alryj	cmryzingn001quw4sn67d2ud0	cmrz70hhk0010uw902yeazj59	2026-07-28 09:17:29.18
cms4fzw85003yuwkoiu01jpyu	cmryzingn001quw4sn67d2ud0	cmrz70hhi000xuw90aewp0y0i	2026-07-28 09:17:29.18
cms4fzw85003xuwko2fqqo5jb	cmryzingn001quw4sn67d2ud0	cmrz5ikeq0011uwvg4fulhwis	2026-07-28 09:17:29.18
cms4fzw85003wuwkosn9045y4	cmryzingn001quw4sn67d2ud0	cmrz5ikew001auwvg3nhlj6xa	2026-07-28 09:17:29.18
cms4fzw85003vuwko2viea7xy	cmryzingn001quw4sn67d2ud0	cmrz6wapj001duw3gsse18u10	2026-07-28 09:17:29.18
cms4fzw85003uuwkofasgx9uy	cmryzingn001quw4sn67d2ud0	cmrz70hha000ouw90cjxkw9r4	2026-07-28 09:17:29.18
cms4fzw84003tuwko7awqm8ia	cmryzingn001quw4sn67d2ud0	cmryynzg80003uw9kmpdhbol9	2026-07-28 09:17:29.18
cms4fzw84003suwko6ygeq663	cmryzingn001quw4sn67d2ud0	cmrz70hh6000juw906nk1b6o9	2026-07-28 09:17:29.18
cms4fzw84003ruwkor9nt976a	cmryzingn001quw4sn67d2ud0	cmryynzg50002uw9klsvlg5yc	2026-07-28 09:17:29.18
cms4fzw84003quwkodpuyvkn0	cmryzingn001quw4sn67d2ud0	cmryynzfw0001uw9k1wb0rg9y	2026-07-28 09:17:29.18
cms4fzw84003puwkon8c39z0k	cmryzingn001quw4sn67d2ud0	cmrz70hh2000cuw90wyjxo1p9	2026-07-28 09:17:29.18
cms4fzw84003ouwkokcnry3yt	cmryzingn001quw4sn67d2ud0	cmryynzge000auw9k9ozc97ko	2026-07-28 09:17:29.18
cms4fzw84003nuwkocsit8bbx	cmryzingn001quw4sn67d2ud0	cmryynzgd0009uw9knaf7urp7	2026-07-28 09:17:29.18
cms4fzw84003muwkosw8tfgqk	cmryzingn001quw4sn67d2ud0	cmryynzgc0008uw9kl0nu76p2	2026-07-28 09:17:29.18
cms4fzw84003luwkoe6au1y31	cmryzingn001quw4sn67d2ud0	cmryynzgb0006uw9k4eaicl2o	2026-07-28 09:17:29.18
cms4fzw84003kuwko5b3s054e	cmryzingn001quw4sn67d2ud0	cmryynzgc0007uw9k21bt32e3	2026-07-28 09:17:29.18
cms4fzw82003juwkonglmug6v	cmryzingn001quw4sn67d2ud0	cmryynzg90004uw9koh3x0e7w	2026-07-28 09:17:29.18
cms4focv8000tuwkop7u53cxz	cms05797b0001uwxc0be7qunf	cms0579f7002cuwxctsaukafz	2026-07-28 09:08:30.875
cms4focv8000suwkoexhfwtgk	cms05797b0001uwxc0be7qunf	cms0579f30029uwxcrxoejblv	2026-07-28 09:08:30.875
cms4focv8000ruwko9d3so6px	cms05797b0001uwxc0be7qunf	cms0579ey0026uwxcl50pptp1	2026-07-28 09:08:30.875
cms4focv8000quwkothqbemj2	cms05797b0001uwxc0be7qunf	cms0579eu0023uwxc0zmwxv2s	2026-07-28 09:08:30.875
cms4focv8000puwkor475ox6v	cms05797b0001uwxc0be7qunf	cms0579ep0020uwxc3q9rdcma	2026-07-28 09:08:30.875
cms4focv8000ouwkozwk60tla	cms05797b0001uwxc0be7qunf	cms0579ek001xuwxc9di6egbk	2026-07-28 09:08:30.875
cms4focv8000nuwkot0z2r6ur	cms05797b0001uwxc0be7qunf	cms0579ef001uuwxca4bm43cn	2026-07-28 09:08:30.875
cms4focv8000muwkowgsip8a3	cms05797b0001uwxc0be7qunf	cms0579eb001ruwxcbskkyool	2026-07-28 09:08:30.875
cms4focv8000luwkosau567hv	cms05797b0001uwxc0be7qunf	cms0579e5001ouwxc1493x2w9	2026-07-28 09:08:30.875
cms4focv8000kuwko0q7ljgf7	cms05797b0001uwxc0be7qunf	cms0579e1001luwxcfuohgcm8	2026-07-28 09:08:30.875
cms4focv8000juwkozdp8wjhe	cms05797b0001uwxc0be7qunf	cms0579dw001iuwxcks21iahi	2026-07-28 09:08:30.875
cms4focv8000iuwko9e6xo89r	cms05797b0001uwxc0be7qunf	cms0579ds001fuwxco3lin6ot	2026-07-28 09:08:30.875
cms4focv8000huwkosfgefwgq	cms05797b0001uwxc0be7qunf	cmrz5ikgd003fuwvgqrg4sbw9	2026-07-28 09:08:30.875
cms4focv8000guwkomvf9rfdf	cms05797b0001uwxc0be7qunf	cms0579di001auwxcvcf5yt5g	2026-07-28 09:08:30.875
cms4focv8000fuwkoirdhtk5w	cms05797b0001uwxc0be7qunf	cmrz6wapj001duw3gsse18u10	2026-07-28 09:08:30.875
cms4focv8000euwko8fzfzme2	cms05797b0001uwxc0be7qunf	cms0579db0015uwxca0332pzy	2026-07-28 09:08:30.875
cms4focv8000duwkouyu1da98	cms05797b0001uwxc0be7qunf	cms0579d60012uwxcgehjdxcd	2026-07-28 09:08:30.875
cms4focv8000cuwkot1ew5zmq	cms05797b0001uwxc0be7qunf	cms0579d1000zuwxc13nv3yf8	2026-07-28 09:08:30.875
cms4focv8000buwkot6nw44jn	cms05797b0001uwxc0be7qunf	cms0579cw000wuwxcv1ymtlxu	2026-07-28 09:08:30.875
cms4focv8000auwko9moj7max	cms05797b0001uwxc0be7qunf	cms0579cp000tuwxcr45tz55z	2026-07-28 09:08:30.875
cms4focv80009uwko9di6feop	cms05797b0001uwxc0be7qunf	cms0579cl000quwxcjuvhzct4	2026-07-28 09:08:30.875
cms4focv80008uwkocs02718c	cms05797b0001uwxc0be7qunf	cms0579cg000nuwxco1tk0g37	2026-07-28 09:08:30.875
cms4focv80007uwkoqd5bp0c1	cms05797b0001uwxc0be7qunf	cms0579c9000kuwxcs8r75z3g	2026-07-28 09:08:30.875
cms4focv80006uwko8f7w3d06	cms05797b0001uwxc0be7qunf	cms0579bz000huwxc1kmfzcc8	2026-07-28 09:08:30.875
cms4focv80005uwkomb9ln8x8	cms05797b0001uwxc0be7qunf	cmrz5ikej000quwvgdltfgnoh	2026-07-28 09:08:30.875
cms4focv80004uwkouuo6kczs	cms05797b0001uwxc0be7qunf	cmrz5ikf3001kuwvgicn0abyi	2026-07-28 09:08:30.875
cms4focv80003uwkoob758bpv	cms05797b0001uwxc0be7qunf	cms0579bc000auwxcb73cv710	2026-07-28 09:08:30.875
cms4focv80002uwko7kolibw0	cms05797b0001uwxc0be7qunf	cms0579b50007uwxc6vmj7jcc	2026-07-28 09:08:30.875
cms4focv80001uwkoncjwzisn	cms05797b0001uwxc0be7qunf	cmrz5iker0013uwvgrq00zyrv	2026-07-28 09:08:30.875
cms4focv10000uwko35npxbfm	cms05797b0001uwxc0be7qunf	cms05798p0002uwxcfvzdtb7g	2026-07-28 09:08:30.875
\.


--
-- Data for Name: ProjectConfiguration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProjectConfiguration" (id, "projectId", bhk, "carpetArea", "builtUpArea", "superBuiltUpArea", "pricePerSqft", "totalPrice", label, "availableUnits", "isAvailable", "createdAt", "updatedAt") FROM stdin;
cmrz98jjo000buwjcgg0iuudy	cmryzinro00dkuw4so1o919h4	2	559	\N	\N	0	8500000	2 BHK (559 sq.ft)	\N	t	2026-07-24 18:09:24.469	2026-07-24 18:09:24.469
cmryzinj0004euw4sgy923zn8	cmryzinix004cuw4s71gpigmc	1	322	\N	\N	18000	5500000	1 BHK (322 sq.ft)	\N	t	2026-07-24 13:37:20.028	2026-07-24 13:37:20.028
cmrz98jkq000duwjcorovwd7h	cmryzinro00dkuw4so1o919h4	2	570	\N	\N	0	8800000	2 BHK (570 sq.ft)	\N	t	2026-07-24 18:09:24.507	2026-07-24 18:09:24.507
cmrz98jov000luwjcv9c14d38	cmryzinro00dkuw4so1o919h4	3	797	\N	\N	0	12500000	3 BHK (797 sq.ft)	\N	t	2026-07-24 18:09:24.656	2026-07-24 18:09:24.656
cmrz4i1wo00f7uwso2s4jyrca	cmryzinro00dkuw4so1o919h4	3	1500	\N	\N	15000	22500000	3 BHK Premium	\N	t	2026-07-24 15:56:50.088	2026-07-24 15:56:50.088
cmryzinlz007muw4smu6uf60y	cmryzinlw007kuw4s4aqjvsd1	1	570	\N	\N	18000	7500000	1 BHK + Study (570 sq.ft)	\N	t	2026-07-24 13:37:20.135	2026-07-24 13:37:20.135
cmryzinmr008cuw4s1jv2qc17	cmryzinlw007kuw4s4aqjvsd1	2	1000	\N	\N	18000	18000000	2 BHK	\N	t	2026-07-24 13:37:20.164	2026-07-24 13:37:20.164
cmrz98jcw0001uwjczx4pu74h	cmryzinlw007kuw4s4aqjvsd1	2	634	\N	\N	0	9500000	2 BHK (634 sq.ft)	\N	t	2026-07-24 18:09:24.221	2026-07-24 18:09:24.221
cmryzinjq0054uw4s6e39m9xy	cmryzinix004cuw4s71gpigmc	2	1000	\N	\N	18000	18000000	2 BHK	\N	t	2026-07-24 13:37:20.054	2026-07-24 13:37:20.054
cmryzinkw006auw4sgpw31tf5	cmryzinix004cuw4s71gpigmc	3	1500	\N	\N	18000	27000000	3 BHK	\N	t	2026-07-24 13:37:20.096	2026-07-24 13:37:20.096
cmryzingp001suw4slq876an5	cmryzingn001quw4sn67d2ud0	2	1000	\N	\N	18000	18000000	2 BHK	\N	t	2026-07-24 13:37:19.946	2026-07-24 13:37:19.946
cmryzinhd002guw4smsh80199	cmryzingn001quw4sn67d2ud0	3	1500	\N	\N	18000	27000000	3 BHK	\N	t	2026-07-24 13:37:19.969	2026-07-24 13:37:19.969
cmryzinf60004uw4se9ots6s0	cmryzinex0002uw4sheqi7453	2	1000	\N	\N	18000	18000000	2 BHK	\N	t	2026-07-24 13:37:19.889	2026-07-24 13:37:19.889
cmryzing0000yuw4smrwcxjhp	cmryzinex0002uw4sheqi7453	3	1500	\N	\N	18000	27000000	3 BHK	\N	t	2026-07-24 13:37:19.92	2026-07-24 13:37:19.92
cms0579fm002iuwxcajlbl5i6	cms05797b0001uwxc0be7qunf	2	639	\N	\N	18000	11502000	2 BHK (639 sq ft)	\N	t	2026-07-25 09:04:12.419	2026-07-25 09:04:12.419
cms0579fq002kuwxc13scmaa3	cms05797b0001uwxc0be7qunf	2	532	\N	\N	18000	9576000	2 BHK (532 sq ft)	\N	t	2026-07-25 09:04:12.422	2026-07-25 09:04:12.422
cms0579fh002guwxcjcrlajj6	cms05797b0001uwxc0be7qunf	3	900	\N	\N	18000	16200000	3 BHK	\N	t	2026-07-25 09:04:12.412	2026-07-25 09:04:12.412
cmrz5dy0100gvuw7wzwe9k78l	cmrz55bod0001uwccft67vh33	3	1500	\N	\N	15000	22500000	3 BHK Premium	\N	t	2026-07-24 16:21:38.016	2026-07-24 16:21:38.016
cmryzinq500bouw4shjv7yczz	cmryzinq300bmuw4s9ui4lu5h	1	500	\N	\N	18000	9000000	1 BHK	\N	t	2026-07-24 13:37:20.286	2026-07-24 13:37:20.286
cmryzinqy00couw4su0bczd6t	cmryzinq300bmuw4s9ui4lu5h	2	1000	\N	\N	18000	18000000	2 BHK	\N	t	2026-07-24 13:37:20.314	2026-07-24 13:37:20.314
cmryzino9009suw4s8bpm5beh	cmryzinnv009euw4smjc2jgcb	2	1000	\N	\N	18000	18000000	2 BHK	\N	t	2026-07-24 13:37:20.217	2026-07-24 13:37:20.217
cmryzinou00acuw4slm7n8hf8	cmryzinnv009euw4smjc2jgcb	3	1500	\N	\N	18000	27000000	3 BHK	\N	t	2026-07-24 13:37:20.239	2026-07-24 13:37:20.239
cmrz98jf00003uwjck751e1r4	cmryzinlw007kuw4s4aqjvsd1	2	704	\N	\N	0	10500000	2 BHK (704 sq.ft)	\N	t	2026-07-24 18:09:24.3	2026-07-24 18:09:24.3
cmrz98jfz0005uwjccl8hb94s	cmryzinlw007kuw4s4aqjvsd1	2	726	\N	\N	0	11000000	2 BHK (726 sq.ft)	\N	t	2026-07-24 18:09:24.335	2026-07-24 18:09:24.335
cmryzinn6008quw4shnj7oql4	cmryzinlw007kuw4s4aqjvsd1	3	1500	\N	\N	18000	27000000	3 BHK	\N	t	2026-07-24 13:37:20.178	2026-07-24 13:37:20.178
cmrz98jic0009uwjcasrt4nr9	cmryzinlw007kuw4s4aqjvsd1	3	985	\N	\N	0	15500000	3 BHK (985 sq.ft)	\N	t	2026-07-24 18:09:24.42	2026-07-24 18:09:24.42
cmrz98jh90007uwjc58g8a6j6	cmryzinlw007kuw4s4aqjvsd1	3	912	\N	\N	0	14000000	3 BHK (912 sq.ft)	\N	t	2026-07-24 18:09:24.381	2026-07-24 18:09:24.381
cmryzinic003muw4sbp1549rh	cmryzinia003kuw4s2gynnavh	1	339	\N	\N	18000	6500000	1 BHK (339 sq.ft)	\N	t	2026-07-24 13:37:20.004	2026-07-24 13:37:20.004
cmrz84s190001uwmsw27kcdmf	cmryzinia003kuw4s2gynnavh	1	385	\N	\N	0	7500000	1 BHK (385 sq.ft)	\N	t	2026-07-24 17:38:29.227	2026-07-24 17:38:29.227
cmryzinif003ouw4sfddqcwis	cmryzinia003kuw4s2gynnavh	2	1000	\N	\N	18000	18000000	2 BHK	\N	t	2026-07-24 13:37:20.007	2026-07-24 13:37:20.007
cmrz98jlv000fuwjcnxuthpt2	cmryzinro00dkuw4so1o919h4	2	578	\N	\N	0	9000000	2 BHK (578 sq.ft)	\N	t	2026-07-24 18:09:24.547	2026-07-24 18:09:24.547
cmrz98jmz000huwjcp5xcqxy2	cmryzinro00dkuw4so1o919h4	2	584	\N	\N	0	9200000	2 BHK (584 sq.ft)	\N	t	2026-07-24 18:09:24.587	2026-07-24 18:09:24.587
cmrz98jo0000juwjce9ct776f	cmryzinro00dkuw4so1o919h4	2	587	\N	\N	0	9300000	2 BHK (587 sq.ft)	\N	t	2026-07-24 18:09:24.625	2026-07-24 18:09:24.625
cmrz4i1td00e9uwsowigfcqai	cmryzinro00dkuw4so1o919h4	2	1000	\N	\N	15000	15000000	2 BHK Premium	\N	t	2026-07-24 15:56:49.97	2026-07-24 15:56:49.97
\.


--
-- Data for Name: ProjectMedia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProjectMedia" (id, "projectId", "configurationId", url, type, "isCover", "sortOrder", "createdAt") FROM stdin;
cms3e2nhj0001uwkstjzkb47h	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/amenities/4_6924c4a81c.webp	IMAGE	f	0	2026-07-27 15:35:52.421
cms3e2niu0003uwkslbjq1opk	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/amenities/small_2_2d59773bed.webp	IMAGE	f	1	2026-07-27 15:35:52.471
cms3e2niy0005uwksp4xqrmar	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/amenities/small_3_917dcca223.webp	IMAGE	f	2	2026-07-27 15:35:52.474
cms3e2nj00007uwksqs9s2xxk	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/amenities/small_5_7e72d11103.webp	IMAGE	f	3	2026-07-27 15:35:52.477
cms3e2nj30009uwksdzgqx7oa	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/amenities/small_6_185f326d09.webp	IMAGE	f	4	2026-07-27 15:35:52.479
cms3e2nj5000buwks2y1eyjp6	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/amenities/small_New_Project_6_e5cd7fe367.webp	IMAGE	f	5	2026-07-27 15:35:52.482
cms3e2nj9000duwks7nggd0cc	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/amenities/small_New_Projeqct_6_11748478ee.webp	IMAGE	f	6	2026-07-27 15:35:52.485
cms3e2njc000fuwkscq2x1yu2	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/cover-image.jpg	IMAGE	t	7	2026-07-27 15:35:52.488
cms3e2nje000huwks0i2h3vgl	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/flat-images/Dosti-604-Bedroom-1.jpg	IMAGE	f	8	2026-07-27 15:35:52.491
cms3e2njh000juwkskyj22uay	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/flat-images/Dosti-604-Bedroom-2.jpg	IMAGE	f	9	2026-07-27 15:35:52.493
cms3e2njj000luwks09aspnie	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/flat-images/Dosti-604-Bedroom-3.jpg	IMAGE	f	10	2026-07-27 15:35:52.495
cms3e2njk000nuwkst3u0fwst	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/flat-images/Dosti-604-Bedroom-4.jpg	IMAGE	f	11	2026-07-27 15:35:52.497
cms3e2njm000puwkskyv2a6yi	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/flat-images/Dosti-604-Bedroom-1.jpg	IMAGE	f	12	2026-07-27 15:35:52.498
cms3e2njo000ruwksjaf43nme	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/flat-images/Dosti-604-Dining-Area.jpg	IMAGE	f	13	2026-07-27 15:35:52.5
cms3e2njq000tuwksgqhvkne4	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/flat-images/Dosti-604-Kitchen-2.jpg	IMAGE	f	14	2026-07-27 15:35:52.502
cms3e2njs000vuwksw38v030c	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/flat-images/Dosti-604-Kitchen.jpg	IMAGE	f	15	2026-07-27 15:35:52.504
cms3e2nju000xuwks36ph048j	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/flat-images/Dosti-604-Living-Room-1.jpg	IMAGE	f	16	2026-07-27 15:35:52.506
cms3e2njw000zuwkssy8npstt	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/flat-images/Dosti-604-Living-Room-2.jpg	IMAGE	f	17	2026-07-27 15:35:52.508
cms3e2njy0011uwkspl94z6md	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/flat-images/Dosti-604-Living-Room-3.jpg	IMAGE	f	18	2026-07-27 15:35:52.51
cms3e2nk00013uwks1vlkkilk	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/flat-images/Dosti-604-wadrobe.jpg	IMAGE	f	19	2026-07-27 15:35:52.512
cms3e2nk20015uwksy0sflj18	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/flat-images/Dosti-604-Washroom-1.jpg	IMAGE	f	20	2026-07-27 15:35:52.514
cms3e2nk40017uwksbo5ia76g	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/flat-images/Dosti-604-Washroom-2.jpg	IMAGE	f	21	2026-07-27 15:35:52.516
cms3e2nk60019uwkslmr6qfeo	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/flat-images/Dosti-604-Washroom-3.jpg	IMAGE	f	22	2026-07-27 15:35:52.518
cms3e2nk8001buwkszggn5k7o	cmryzinex0002uw4sheqi7453	\N	http://localhost:5000/uploads/dosti-604/flat-images/Dosti-604-Washroom-4.jpg	IMAGE	f	23	2026-07-27 15:35:52.52
cms3e2nkl001duwkshf6oovte	cmryzingn001quw4sn67d2ud0	cmryzingp001suw4slq876an5	http://localhost:5000/uploads/dosti-eden/flat-image/floor_plan.png	FLOOR_PLAN	f	0	2026-07-27 15:35:52.533
cms3e2nko001fuwkss8jybsr8	cmryzingn001quw4sn67d2ud0	cmryzinhd002guw4smsh80199	http://localhost:5000/uploads/dosti-eden/flat-image/floor_plan.png	FLOOR_PLAN	f	1	2026-07-27 15:35:52.537
cms3e2nkr001huwkso6hczk8f	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/amenities/Aerial_Cam_1_1_untag_f812a82163.jpg	IMAGE	f	2	2026-07-27 15:35:52.539
cms3e2nkt001juwks67n9clie	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/amenities/Gym_Cam_untag_811713e855.jpg	IMAGE	f	3	2026-07-27 15:35:52.541
cms3e2nkv001luwksa2zjc3jy	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/amenities/Gym_untag_6bc8742f17.jpg	IMAGE	f	4	2026-07-27 15:35:52.543
cms3e2nkx001nuwks7gdv2yrk	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/amenities/Kids_Play_Aeria_untag_fd3e80a3c3.jpg	IMAGE	f	5	2026-07-27 15:35:52.545
cms3e2nkz001puwks9baw51ih	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/amenities/multipurpose_untag_423d8a56dc.jpg	IMAGE	f	6	2026-07-27 15:35:52.547
cms3e2nl1001ruwksg4y2w9fp	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/amenities/New_Cam_untag_bc059f5141.jpg	IMAGE	f	7	2026-07-27 15:35:52.549
cms3e2nl3001tuwks8wq8qvae	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/amenities/Podium_Render_1_untag_b8b9dff01b.jpg	IMAGE	f	8	2026-07-27 15:35:52.551
cms3e2nl5001vuwks5vkb1iay	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/amenities/Right_Side_Angel_untag_41b8f40134.jpg	IMAGE	f	9	2026-07-27 15:35:52.554
cms3e2nl8001xuwkscs0cgofk	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/amenities/small_aerial_cam_1_untag_fa903d2872.jpg	IMAGE	f	10	2026-07-27 15:35:52.556
cms3e2nl9001zuwksn7flwgqb	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/amenities/small_Jacuzzi_Cam_untag_f478b3a9a3.jpg	IMAGE	f	11	2026-07-27 15:35:52.558
cms3e2nlb0021uwksmstfxsr2	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/cover-image.jpg	IMAGE	t	12	2026-07-27 15:35:52.56
cms3e2nld0023uwksax7g08wo	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/flat-image/Balcony.jpg	IMAGE	f	13	2026-07-27 15:35:52.562
cms3e2nlf0025uwksyssoqkre	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/flat-image/Common-Toilet.jpg	IMAGE	f	14	2026-07-27 15:35:52.563
cms3e2nlh0027uwksprjs3rs2	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/flat-image/Dining-Area-(2).jpg	IMAGE	f	15	2026-07-27 15:35:52.566
cms3e2nlj0029uwks0lch3iy9	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/flat-image/Dining-Area.jpg	IMAGE	f	16	2026-07-27 15:35:52.567
cms3e2nln002buwks694d9yes	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/flat-image/Kids-Bedroom-(3).jpg	IMAGE	f	17	2026-07-27 15:35:52.571
cms3e2nlp002duwksobf0kber	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/flat-image/Kids-Bedroom.jpg	IMAGE	f	18	2026-07-27 15:35:52.574
cms3e2nlr002fuwkshl6kjmvo	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/flat-image/Living-Room-(2).jpg	IMAGE	f	19	2026-07-27 15:35:52.576
cms3e2nlt002huwks7ypdu35i	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/flat-image/Living-Room-(3).jpg	IMAGE	f	20	2026-07-27 15:35:52.578
cms3e2nlv002juwksdvuhcbfq	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/flat-image/Living-Room.jpg	IMAGE	f	21	2026-07-27 15:35:52.579
cms3e2nlx002luwksket2ozpi	cmryzingn001quw4sn67d2ud0	\N	http://localhost:5000/uploads/dosti-eden/flat-image/Master-Toilet.jpg	IMAGE	f	22	2026-07-27 15:35:52.581
cms3e2nmc002nuwkst8ljxh27	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/amenities/Open_Gym_Cam_01_2_24cb8712fb.jpg	IMAGE	f	0	2026-07-27 15:35:52.596
cms3e2nmj002vuwksux9dqzg7	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/amenities/small_K_Ids_side_cam01_2_f41153f1ef.jpg	IMAGE	f	4	2026-07-27 15:35:52.604
cms3e2nml002xuwks7hgxdq4s	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/amenities/small_Lawn_cam3_01_2_ddc7fe1031.jpg	IMAGE	f	5	2026-07-27 15:35:52.606
cms3e2nmo002zuwks7jxoxoju	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/amenities/small_tenis_cam_2_a12b61a513.jpg	IMAGE	f	6	2026-07-27 15:35:52.608
cms3e2nmq0031uwksmkswc9le	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/amenities/Table_tennis_Main_Cam_250_F_00000_2_df5fbccfdf.jpg	IMAGE	f	7	2026-07-27 15:35:52.61
cms3e2nmr0033uwksxmzxvxth	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/cover-image.jpg	IMAGE	t	8	2026-07-27 15:35:52.612
cms3e2nmt0035uwks30nhk78p	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/1Q2A2288.jpg	IMAGE	f	9	2026-07-27 15:35:52.614
cms3e2nmv0037uwks53tkjom9	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/1Q2A2293.jpg	IMAGE	f	10	2026-07-27 15:35:52.616
cms3e2nmx0039uwksl3snqvfi	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/1Q2A2308.jpg	IMAGE	f	11	2026-07-27 15:35:52.618
cms3e2nmz003buwks31pmhvwv	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/1Q2A2317.jpg	IMAGE	f	12	2026-07-27 15:35:52.62
cms3e2nn1003duwksto06i1ky	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/1Q2A2327.jpg	IMAGE	f	13	2026-07-27 15:35:52.622
cms3e2nn4003fuwks44ov2fec	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/1Q2A2351-Pano.jpg	IMAGE	f	14	2026-07-27 15:35:52.624
cms3e2nn6003huwksbzjqq7wl	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/1Q2A2370-Pano.jpg	IMAGE	f	15	2026-07-27 15:35:52.626
cms3e2nn8003juwksvrimyfyg	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/1Q2A2382.jpg	IMAGE	f	16	2026-07-27 15:35:52.629
cms3e2nna003luwks13ya1rpo	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/1Q2A2406-Pano.jpg	IMAGE	f	17	2026-07-27 15:35:52.631
cms3e2nnd003nuwksenrgquku	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/1Q2A2420-Pano.jpg	IMAGE	f	18	2026-07-27 15:35:52.633
cms3e2nnf003puwksjcdde0ci	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/1Q2A2455.jpg	IMAGE	f	19	2026-07-27 15:35:52.635
cms3e2nnh003ruwkso4taewy4	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Bathroom-1.jpg	IMAGE	f	20	2026-07-27 15:35:52.637
cms3e2nnj003tuwksaog945is	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Bathroom-2.jpg	IMAGE	f	21	2026-07-27 15:35:52.639
cms3e2nnl003vuwkso4b4qmya	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Bedroom-2.jpg	IMAGE	f	22	2026-07-27 15:35:52.641
cms3e2nnn003xuwks4k41vv2i	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Bedroom(1).jpg	IMAGE	f	23	2026-07-27 15:35:52.644
cms3e2nnp003zuwksfcrefa65	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Bedroom(2).jpg	IMAGE	f	24	2026-07-27 15:35:52.646
cms3e2nnr0041uwks3ybhmepv	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Bedroom.jpg	IMAGE	f	25	2026-07-27 15:35:52.648
cms3e2nnt0043uwksawbraxhx	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Common-Bathroom-.jpg	IMAGE	f	26	2026-07-27 15:35:52.65
cms3e2nnv0045uwkssx5ufqla	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Dining-Area-1.jpg	IMAGE	f	27	2026-07-27 15:35:52.651
cms3e8q5x001juw38o6fyw2kx	cmryzinq300bmuw4s9ui4lu5h	cmryzinq500bouw4shjv7yczz	http://localhost:5000/uploads/floor_plan-1785166835812-864566855.jpg	FLOOR_PLAN	f	2	2026-07-27 15:40:35.829
cms3e8q6e001luw38d5qd2qqq	cmryzinq300bmuw4s9ui4lu5h	cmryzinqy00couw4su0bczd6t	http://localhost:5000/uploads/floor_plan-1785166835813-5982153.jpg	FLOOR_PLAN	f	3	2026-07-27 15:40:35.846
cms3ecsvo0031uw38bye54m0l	cmryzinnv009euw4smjc2jgcb	cmryzino9009suw4s8bpm5beh	http://localhost:5000/uploads/floor_plan-1785167025960-824306972.jpg	FLOOR_PLAN	f	0	2026-07-27 15:43:45.972
cms3e2nnx0047uwksalmff05w	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Dining-Area.jpg	IMAGE	f	28	2026-07-27 15:35:52.653
cms3e2nnz0049uwks475g9yqj	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/DINNING.jpg	IMAGE	f	29	2026-07-27 15:35:52.655
cms3e2no1004buwksapr759tt	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Kitchen-and-Dining(1).jpg	IMAGE	f	30	2026-07-27 15:35:52.657
cms3e2no3004duwksydlv78cj	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Kitchen-and-Dining.jpg	IMAGE	f	31	2026-07-27 15:35:52.659
cms3e2no5004fuwksqx5vtu2m	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/KITCHEN.jpg	IMAGE	f	32	2026-07-27 15:35:52.662
cms3e2no7004huwks848bmxjs	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Living-Room-(1).jpg	IMAGE	f	33	2026-07-27 15:35:52.663
cms3e2no9004juwkslmirrdwc	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Living-Room-(2).jpg	IMAGE	f	34	2026-07-27 15:35:52.665
cms3e2nob004luwksv0cxqdfj	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Living-Room-2.jpg	IMAGE	f	35	2026-07-27 15:35:52.667
cms3e2nod004nuwksup4xmq2b	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Living-Room(1).jpg	IMAGE	f	36	2026-07-27 15:35:52.669
cms3e2nof004puwksh1vap3nn	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Living-Room(2).jpg	IMAGE	f	37	2026-07-27 15:35:52.672
cms3e2noh004ruwksm6ldu6xh	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Living-Room.jpg	IMAGE	f	38	2026-07-27 15:35:52.674
cms3e2noj004tuwksgt3awh17	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Master-Bathroom.jpg	IMAGE	f	39	2026-07-27 15:35:52.676
cms3ecsvv0033uw386xyzvsup	cmryzinnv009euw4smjc2jgcb	cmryzinou00acuw4slm7n8hf8	http://localhost:5000/uploads/floor_plan-1785167025962-512209215.jpg	FLOOR_PLAN	f	1	2026-07-27 15:43:45.98
cms3e2nol004vuwksonuwxrf1	cmryzinia003kuw4s2gynnavh	\N	http://localhost:5000/uploads/dosti-greater-thane/flat-images/Passage.jpg	IMAGE	f	40	2026-07-27 15:35:52.678
cms3e2np9004zuwks62hc370t	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/amenities/small_Entrance_Cam_e397a64b9e.jpg	IMAGE	f	1	2026-07-27 15:35:52.701
cms3e2npb0051uwkszw18bpmu	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/amenities/small_Kids_Cam_new_16a6bd8159.jpg	IMAGE	f	2	2026-07-27 15:35:52.703
cms3e2npd0053uwksxlqfgam7	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/amenities/small_Road_Cam_Dostision_revised_eb913e2a45.jpg	IMAGE	f	3	2026-07-27 15:35:52.705
cms3e2npf0055uwksdrxti3tm	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/amenities/small_Vector_Smart_Object_05_43c7e3cacb.jpg	IMAGE	f	4	2026-07-27 15:35:52.707
cms3e2nph0057uwks4t5heo7e	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/amenities/small_Vector_Smart_Object_06_7a59e9e2f0.jpg	IMAGE	f	5	2026-07-27 15:35:52.709
cms3e2npi0059uwksuu85be43	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/amenities/small_Vector_Smart_Object_07_e33dc8e9b7.jpg	IMAGE	f	6	2026-07-27 15:35:52.711
cms3e2npk005buwksqedyhgxo	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/amenities/small_Vector_Smart_Object_09_1d788bfa6b.jpg	IMAGE	f	7	2026-07-27 15:35:52.712
cms3e2npm005duwksao70qa4e	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/amenities/small_Vector_Smart_Object_13_24ba3b4892.jpg	IMAGE	f	8	2026-07-27 15:35:52.714
cms3e2npo005fuwksbvvzvk1h	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/amenities/small_Vector_Smart_Object_14_d732b0024e.jpg	IMAGE	f	9	2026-07-27 15:35:52.716
cms3e2npq005huwksl6hg4mps	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/amenities/small_Vector_Smart_Object_15_fd8c98bfbb.jpg	IMAGE	f	10	2026-07-27 15:35:52.718
cms3e2nps005juwksiqqg4lgl	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/amenities/small_Vector_Smart_Object_24_94929d7dcb.jpg	IMAGE	f	11	2026-07-27 15:35:52.72
cms3e2npu005luwks2qadlcod	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/amenities/small_Vector_Smart_Object_26_77c44377a9.jpg	IMAGE	f	12	2026-07-27 15:35:52.723
cms3e2npw005nuwks1qtkzu9z	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/amenities/small_Vector_Smart_Object_28_b93c208fec.jpg	IMAGE	f	13	2026-07-27 15:35:52.724
cms3e2npy005puwks7w6qkr0v	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/amenities/Vector_Smart_Object_18_eb68c0bb54.jpg	IMAGE	f	14	2026-07-27 15:35:52.726
cms3e2nq0005ruwksa3lmvsl5	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/cover-image.jpg	IMAGE	t	15	2026-07-27 15:35:52.728
cms3e2nq2005tuwks5fqvvumv	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/Bathroom-3.jpg	IMAGE	f	16	2026-07-27 15:35:52.73
cms3e2nq4005vuwkswu3ijjm5	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/Bathroom.jpg	IMAGE	f	17	2026-07-27 15:35:52.732
cms3e2ns20075uwkstzyl3734	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB1953-HDR.jpg	IMAGE	f	40	2026-07-27 15:35:52.802
cms3e2nq6005xuwkspuc7vygy	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/Bedroom-1.jpg	IMAGE	f	18	2026-07-27 15:35:52.734
cms3e2nq9005zuwks93p0wyou	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/Bedroom-2-option.jpg	IMAGE	f	19	2026-07-27 15:35:52.737
cms3e2nqa0061uwks5whm03q3	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/Bedroom-2.jpg	IMAGE	f	20	2026-07-27 15:35:52.739
cms3e2nqc0063uwks22kb79zx	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/Dining-Area.jpg	IMAGE	f	21	2026-07-27 15:35:52.741
cms3e2nqe0065uwksgaa97d3n	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/Kids-Room.jpg	IMAGE	f	22	2026-07-27 15:35:52.743
cms3e2nqg0067uwksswbn54vr	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/Kitchen-1.jpg	IMAGE	f	23	2026-07-27 15:35:52.745
cms3e2nqj0069uwksfinzurqc	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/Kitchen.jpg	IMAGE	f	24	2026-07-27 15:35:52.747
cms3e2nql006buwks71bil56q	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/Living-Room-1.jpg	IMAGE	f	25	2026-07-27 15:35:52.749
cms3e2nqn006duwkslqsj7g9n	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/Living-Room.jpg	IMAGE	f	26	2026-07-27 15:35:52.751
cms3e2nqp006fuwks47q53exa	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/Master-Bedroom-1.jpg	IMAGE	f	27	2026-07-27 15:35:52.753
cms3e2nqq006huwks93s5f5rl	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/Master-Bedroom.jpg	IMAGE	f	28	2026-07-27 15:35:52.755
cms3e2nqs006juwksn3xu63wj	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/master-bedroom1.jpg	IMAGE	f	29	2026-07-27 15:35:52.757
cms3e2nqu006luwksvajv42ok	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/materbedroom.jpg	IMAGE	f	30	2026-07-27 15:35:52.758
cms3e2nrk006nuwksja7034pb	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB1873-HDR---Copy.jpg	IMAGE	f	31	2026-07-27 15:35:52.785
cms3e2nrm006puwksx7lpiing	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB1883-HDR---Copy.jpg	IMAGE	f	32	2026-07-27 15:35:52.787
cms3e2nrp006ruwksxjh3gl6t	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB1893-HDR---Copy.jpg	IMAGE	f	33	2026-07-27 15:35:52.789
cms3e2nrr006tuwksxlgp9i27	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB1898-HDR---Copy.jpg	IMAGE	f	34	2026-07-27 15:35:52.791
cms3e2nrt006vuwks1ldy667r	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB1908-HDR---Copy.jpg	IMAGE	f	35	2026-07-27 15:35:52.793
cms3e2nrv006xuwksjtpubvrx	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB1923-HDR---Copy.jpg	IMAGE	f	36	2026-07-27 15:35:52.795
cms3e2nrx006zuwks8ka3feu9	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB1938-HDR.jpg	IMAGE	f	37	2026-07-27 15:35:52.797
cms3e2nrz0071uwksfjchsao5	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB1943-HDR.jpg	IMAGE	f	38	2026-07-27 15:35:52.799
cms3e2ns00073uwks7i3xjxmm	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB1948-HDR.jpg	IMAGE	f	39	2026-07-27 15:35:52.801
cms3e2ns50077uwkscbcyyujo	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB1968-HDR.jpg	IMAGE	f	41	2026-07-27 15:35:52.805
cms3e2ns70079uwksznk82v5w	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB1973-HDR.jpg	IMAGE	f	42	2026-07-27 15:35:52.807
cms3e2ns9007buwksxqm92t8g	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB1993-HDR.jpg	IMAGE	f	43	2026-07-27 15:35:52.809
cms3e2nsa007duwkspjyamvfb	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2003-HDR.jpg	IMAGE	f	44	2026-07-27 15:35:52.81
cms3e2nsc007fuwksqf62o1rs	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2008-HDR.jpg	IMAGE	f	45	2026-07-27 15:35:52.813
cms3e2nse007huwks3e0zhly3	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2013-HDR.jpg	IMAGE	f	46	2026-07-27 15:35:52.814
cms3e2nsg007juwks38sh3mgn	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2023-HDR.jpg	IMAGE	f	47	2026-07-27 15:35:52.816
cms3e2nsi007luwksgg7yb12i	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2033-HDR.jpg	IMAGE	f	48	2026-07-27 15:35:52.818
cms3e2nsj007nuwksngvgo9e0	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2043-HDR.jpg	IMAGE	f	49	2026-07-27 15:35:52.82
cms3e2nsl007puwkspdfdn9q7	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2048-HDR.jpg	IMAGE	f	50	2026-07-27 15:35:52.822
cms3e2nsn007ruwksl2jh9n0t	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2053-HDR---Copy.jpg	IMAGE	f	51	2026-07-27 15:35:52.823
cms3e2nsp007tuwksv18zbs8a	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2063-HDR---Copy.jpg	IMAGE	f	52	2026-07-27 15:35:52.826
cms3e2nsr007vuwksq698pz6z	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2073-HDR---Copy.jpg	IMAGE	f	53	2026-07-27 15:35:52.828
cms3e2nst007xuwksfgh96d7d	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2078-HDR---Copy.jpg	IMAGE	f	54	2026-07-27 15:35:52.829
cms3e2nsv007zuwksmw64uc3r	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2093-HDR---Copy.jpg	IMAGE	f	55	2026-07-27 15:35:52.831
cms3e2nsx0081uwksywfx4tuq	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2098-HDR---Copy.jpg	IMAGE	f	56	2026-07-27 15:35:52.833
cms3e2nsz0083uwksketfp81w	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2103-HDR---Copy.jpg	IMAGE	f	57	2026-07-27 15:35:52.835
cms3e2nt10085uwkspx2lzfif	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2113-HDR---Copy.jpg	IMAGE	f	58	2026-07-27 15:35:52.837
cms3e2nt20087uwks4e429u8d	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2118-HDR---Copy.jpg	IMAGE	f	59	2026-07-27 15:35:52.839
cms3e2nt40089uwkswrspt0pq	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2123-HDR---Copy.jpg	IMAGE	f	60	2026-07-27 15:35:52.841
cms3e2nt6008buwksqo10ioid	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2128-HDR---Copy.jpg	IMAGE	f	61	2026-07-27 15:35:52.843
cms3e2nt8008duwks8lkorfqf	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2138-HDR---Copy.jpg	IMAGE	f	62	2026-07-27 15:35:52.845
cms3e2nta008fuwks03gtpjv0	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2143-HDR---Copy.jpg	IMAGE	f	63	2026-07-27 15:35:52.847
cms3e2ntc008huwksb5ued7mz	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2153-HDR---Copy.jpg	IMAGE	f	64	2026-07-27 15:35:52.848
cms3e2nte008juwksdaosu83a	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2163-HDR---Copy.jpg	IMAGE	f	65	2026-07-27 15:35:52.85
cms3e2ntg008luwksgj3fpgeq	cms05797b0001uwxc0be7qunf	\N	http://localhost:5000/uploads/dosti-mezzo-22/flat-images/_PAB2178-HDR.jpg	IMAGE	f	66	2026-07-27 15:35:52.852
cms3e2nu0008nuwksraz17s84	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/amenities/DSC_4289_159c7fe6ff.jpg	IMAGE	f	0	2026-07-27 15:35:52.872
cms3e2nu2008puwks053jftgt	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/amenities/small_8_4679405db1.jpg	IMAGE	f	1	2026-07-27 15:35:52.875
cms3e2nu5008ruwkstp1blrm7	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/amenities/small_DSC_0146_8450d6d045-(1).jpg	IMAGE	f	2	2026-07-27 15:35:52.877
cms3e2nu7008tuwksetxg5cln	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/amenities/small_DSC_0167_1c9389649e.jpg	IMAGE	f	3	2026-07-27 15:35:52.879
cms3e2nua008vuwksgximvxb7	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/amenities/small_DSC_4161_f9b31ae790.jpg	IMAGE	f	4	2026-07-27 15:35:52.882
cms3e2nuc008xuwkshi50cjc3	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/amenities/small_DSC_4273_8f3ebedc8e-(1).jpg	IMAGE	f	5	2026-07-27 15:35:52.884
cms3e2nuf008zuwks5sljerx0	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/amenities/small_DSC_4339_ec43420846.jpg	IMAGE	f	6	2026-07-27 15:35:52.887
cms3e2nuh0091uwkszvgtzvxf	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/amenities/small_DSC_4564_b85355189b.jpg	IMAGE	f	7	2026-07-27 15:35:52.89
cms3e2nuk0093uwks1ijzvq1n	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/amenities/small_DWC_NEST_Elevation_1920px_x_960px_02_2_86133f8873.jpg	IMAGE	f	8	2026-07-27 15:35:52.892
cms3e2num0095uwks0ek6f4qi	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/cover.jpg	IMAGE	t	9	2026-07-27 15:35:52.894
cms3e2nuo0097uwksrjp4qpd1	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Bathroom-1---Copy.jpg	IMAGE	f	10	2026-07-27 15:35:52.897
cms3e2nur0099uwks4xy2ip13	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Bathroom-1.jpg	IMAGE	f	11	2026-07-27 15:35:52.899
cms3e2nut009buwkswxcs6lbl	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Bathroom-2---Copy.jpg	IMAGE	f	12	2026-07-27 15:35:52.902
cms3e2nuv009duwks5oevayyz	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Bathroom-2.jpg	IMAGE	f	13	2026-07-27 15:35:52.903
cms3e2nux009fuwkszlkclprw	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Bathroom.jpg	IMAGE	f	14	2026-07-27 15:35:52.906
cms3e2nv0009huwkszzlwupil	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Bedroom.jpg	IMAGE	f	15	2026-07-27 15:35:52.908
cms3e2nv2009juwkssotw47uq	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Dining-Area-1.jpg	IMAGE	f	16	2026-07-27 15:35:52.91
cms3e2nv4009luwks3liqbwgh	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Dining-Area.jpg	IMAGE	f	17	2026-07-27 15:35:52.913
cms3e2nv7009nuwksp363xx83	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/DINNING.jpg	IMAGE	f	18	2026-07-27 15:35:52.915
cms3e2nv9009puwkse3xxa6sw	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/img0187.jpg	IMAGE	f	19	2026-07-27 15:35:52.917
cms3e2nvb009ruwks2mdtdci5	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/img0192.jpg	IMAGE	f	20	2026-07-27 15:35:52.919
cms3e2nvd009tuwksmaxppk36	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/img0197.jpg	IMAGE	f	21	2026-07-27 15:35:52.921
cms3e2nve009vuwksyoq57k3i	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/IMG_0008_1.jpg	IMAGE	f	22	2026-07-27 15:35:52.923
cms3e2nvh009xuwksqr3ydhwh	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/IMG_0009.jpg	IMAGE	f	23	2026-07-27 15:35:52.926
cms3e2nvj009zuwks66f57t58	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/IMG_0010.jpg	IMAGE	f	24	2026-07-27 15:35:52.927
cms3e2nvl00a1uwkso7zlyo0q	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/IMG_0020_1.jpg	IMAGE	f	25	2026-07-27 15:35:52.929
cms3e2nvn00a3uwksmz0hcbxj	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/IMG_0039.jpg	IMAGE	f	26	2026-07-27 15:35:52.931
cms3e2nvp00a5uwks2dlyeuqt	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/IMG_0055.jpg	IMAGE	f	27	2026-07-27 15:35:52.933
cms3e2nvr00a7uwkszy4q4nu9	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/IMG_0065.jpg	IMAGE	f	28	2026-07-27 15:35:52.935
cms3e2nvt00a9uwksgz24qkx0	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/IMG_0080.jpg	IMAGE	f	29	2026-07-27 15:35:52.937
cms3e2nvw00abuwks6cxup90m	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/IMG_0120.jpg	IMAGE	f	30	2026-07-27 15:35:52.94
cms3e2nvy00aduwksypmiq9os	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Kitchen-(2).jpg	IMAGE	f	31	2026-07-27 15:35:52.942
cms3e2nw000afuwksx1z792ot	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Kitchen-1.jpg	IMAGE	f	32	2026-07-27 15:35:52.944
cms3e2nw200ahuwksjharc3m6	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Kitchen-2.jpg	IMAGE	f	33	2026-07-27 15:35:52.946
cms3e2nw400ajuwkseg5ygmyq	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Kitchen(1).jpg	IMAGE	f	34	2026-07-27 15:35:52.948
cms3e2nw600aluwksx9jbekgs	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/KITCHEN.jpg	IMAGE	f	35	2026-07-27 15:35:52.95
cms3e2nwb00anuwksu3701lep	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Living-Room-(2).jpg	IMAGE	f	36	2026-07-27 15:35:52.956
cms3e2nwe00apuwksnnay5dro	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Living-Room-1.jpg	IMAGE	f	37	2026-07-27 15:35:52.958
cms3e2nwg00aruwkseyhn3aow	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Living-Room-2.jpg	IMAGE	f	38	2026-07-27 15:35:52.96
cms3e2nwi00atuwksujgs9k1e	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Living-Room-3.jpg	IMAGE	f	39	2026-07-27 15:35:52.962
cms3e2nwk00avuwks54evn46e	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Master-Bathroom.jpg	IMAGE	f	40	2026-07-27 15:35:52.965
cms3e2nwm00axuwksnaw5kvev	cmryzinix004cuw4s71gpigmc	\N	http://localhost:5000/uploads/dosti-nest/flat-image/Master-Bedroom.jpg	IMAGE	f	41	2026-07-27 15:35:52.967
cms3e2nx500azuwksk6xcusx0	cmryzinlw007kuw4s4aqjvsd1	cmryzinlz007muw4smu6uf60y	http://localhost:5000/uploads/dosti-olive/floor-plan/floor_plan_1bhk.png	FLOOR_PLAN	f	0	2026-07-27 15:35:52.985
cms3e2nx800b1uwkslszur9n1	cmryzinlw007kuw4s4aqjvsd1	cmryzinmr008cuw4s1jv2qc17	http://localhost:5000/uploads/dosti-olive/floor-plan/floor_plan_2bhk.png	FLOOR_PLAN	f	1	2026-07-27 15:35:52.988
cms3e2nxa00b3uwkscmvtx1wy	cmryzinlw007kuw4s4aqjvsd1	cmrz98jcw0001uwjczx4pu74h	http://localhost:5000/uploads/dosti-olive/floor-plan/floor_plan_2bhk.png	FLOOR_PLAN	f	2	2026-07-27 15:35:52.99
cms3e2nxc00b5uwks9ge5ndiu	cmryzinlw007kuw4s4aqjvsd1	cmrz98jf00003uwjck751e1r4	http://localhost:5000/uploads/dosti-olive/floor-plan/floor_plan_2bhk.png	FLOOR_PLAN	f	3	2026-07-27 15:35:52.992
cms3e2nxe00b7uwksk750toph	cmryzinlw007kuw4s4aqjvsd1	cmrz98jfz0005uwjccl8hb94s	http://localhost:5000/uploads/dosti-olive/floor-plan/floor_plan_2bhk.png	FLOOR_PLAN	f	4	2026-07-27 15:35:52.994
cms3e2nxg00b9uwksjfbj07mn	cmryzinlw007kuw4s4aqjvsd1	cmryzinn6008quw4shnj7oql4	http://localhost:5000/uploads/dosti-olive/floor-plan/floor_plan_3bhk.png	FLOOR_PLAN	f	5	2026-07-27 15:35:52.996
cms3e2nxi00bbuwks1y5zwpos	cmryzinlw007kuw4s4aqjvsd1	cmrz98jic0009uwjcasrt4nr9	http://localhost:5000/uploads/dosti-olive/floor-plan/floor_plan_3bhk.png	FLOOR_PLAN	f	6	2026-07-27 15:35:52.999
cms3e2nxk00bduwksgxvshf75	cmryzinlw007kuw4s4aqjvsd1	cmrz98jh90007uwjc58g8a6j6	http://localhost:5000/uploads/dosti-olive/floor-plan/floor_plan_3bhk.png	FLOOR_PLAN	f	7	2026-07-27 15:35:53.001
cms3e2nxt00bluwkst3g49z41	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/amenities/Dosti-Balcom---Bird-Eye.jpg	IMAGE	f	11	2026-07-27 15:35:53.009
cms3e2nxv00bnuwksv6dtf27o	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/amenities/DSC_0244_7ebf3516e5.jpg	IMAGE	f	12	2026-07-27 15:35:53.012
cms3e2nxy00bpuwks6fgglf1g	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/amenities/DSC_4067_f3e178f568.jpg	IMAGE	f	13	2026-07-27 15:35:53.014
cms3e2nxz00bruwksq2og0oxr	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/amenities/DSC_4161_f9b31ae790.jpg	IMAGE	f	14	2026-07-27 15:35:53.016
cms3e2ny100btuwks95e1yujj	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/amenities/DSC_4245_8eb9750a04.jpg	IMAGE	f	15	2026-07-27 15:35:53.017
cms3e2ny300bvuwkswegt50t8	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/amenities/DSC_4289_159c7fe6ff.jpg	IMAGE	f	16	2026-07-27 15:35:53.019
cms3e2ny400bxuwksx2ey98yv	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/dosti-olive.jpg	IMAGE	t	17	2026-07-27 15:35:53.021
cms3e2ny600bzuwks5ayyiiie	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/Bathroom.jpg	IMAGE	f	18	2026-07-27 15:35:53.022
cms3e2ny700c1uwkspn1497pe	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/Bedroom-2.jpg	IMAGE	f	19	2026-07-27 15:35:53.024
cms3e2ny900c3uwksjzhiqyta	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/Bedroom.jpg	IMAGE	f	20	2026-07-27 15:35:53.026
cms3e2nyb00c5uwkswxhj0lfp	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/Common-Bathroom.jpg	IMAGE	f	21	2026-07-27 15:35:53.027
cms3e2nyd00c7uwks5j0pruri	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/img0149.jpg	IMAGE	f	22	2026-07-27 15:35:53.029
cms3e2nye00c9uwks6x77ghq7	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/img0187.jpg	IMAGE	f	23	2026-07-27 15:35:53.03
cms3e2nyg00cbuwksfpvqurrm	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/img0192.jpg	IMAGE	f	24	2026-07-27 15:35:53.032
cms3e2nyh00cduwks2tpl25km	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/img0197.jpg	IMAGE	f	25	2026-07-27 15:35:53.034
cms3e2nyj00cfuwksll3rnmz3	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/IMG_0035_1.jpg	IMAGE	f	26	2026-07-27 15:35:53.035
cms3e2nyk00chuwks2lprulku	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/IMG_0039.jpg	IMAGE	f	27	2026-07-27 15:35:53.037
cms3e2nym00cjuwksd3l7yqbp	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/IMG_0050.jpg	IMAGE	f	28	2026-07-27 15:35:53.038
cms3e2nyo00cluwks1uf5h268	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/IMG_0055.jpg	IMAGE	f	29	2026-07-27 15:35:53.04
cms3e2nyp00cnuwksng9xqey9	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/IMG_0080.jpg	IMAGE	f	30	2026-07-27 15:35:53.042
cms3e2nyr00cpuwkstv3d5c3x	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/IMG_0120.jpg	IMAGE	f	31	2026-07-27 15:35:53.043
cms3e2nyt00cruwksu7cm6buf	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/IMG_0130.jpg	IMAGE	f	32	2026-07-27 15:35:53.045
cms3e2nyv00ctuwksl7sure5b	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/IMG_0140.jpg	IMAGE	f	33	2026-07-27 15:35:53.047
cms3e2nyw00cvuwkskzcn1tig	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/Kitchen-1.jpg	IMAGE	f	34	2026-07-27 15:35:53.048
cms3e2nyy00cxuwksm7cg4vgj	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/Kitchen-2.jpg	IMAGE	f	35	2026-07-27 15:35:53.05
cms3e2nz000czuwkshexvpjps	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/Kitchen(1).jpg	IMAGE	f	36	2026-07-27 15:35:53.052
cms3e2nz100d1uwkscpb56r8f	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/Living-Room-(2).jpg	IMAGE	f	37	2026-07-27 15:35:53.054
cms3e2nz300d3uwksrx6il4ax	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/Living-Room-(3).jpg	IMAGE	f	38	2026-07-27 15:35:53.055
cms3e2nz500d5uwks0wh2i0vu	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/Living-Room-1.jpg	IMAGE	f	39	2026-07-27 15:35:53.057
cms3e2nz600d7uwksseahvwhh	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/Living-Room-2.jpg	IMAGE	f	40	2026-07-27 15:35:53.059
cms3e2nz800d9uwksti7s6dot	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/Living-Room-3.jpg	IMAGE	f	41	2026-07-27 15:35:53.06
cms3e2nzc00dbuwks1ha2wtnu	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/Living-Room.jpg	IMAGE	f	42	2026-07-27 15:35:53.064
cms3e2nze00dduwksf74757cg	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/Master-Bathroom.jpg	IMAGE	f	43	2026-07-27 15:35:53.066
cms3e2nzf00dfuwksal0zw4hy	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/Master-Bedroom-(2).jpg	IMAGE	f	44	2026-07-27 15:35:53.068
cms3e2nzh00dhuwkshuang8op	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/Master-Bedroom.jpg	IMAGE	f	45	2026-07-27 15:35:53.07
cms3e2nzj00djuwks659p5h4n	cmryzinlw007kuw4s4aqjvsd1	\N	http://localhost:5000/uploads/dosti-olive/flat-images/Passage.jpg	IMAGE	f	46	2026-07-27 15:35:53.071
cms3e2o0f00dxuwksm2e8gvs6	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/amenities/DSC_0244_7ebf3516e5.jpg	IMAGE	f	6	2026-07-27 15:35:53.104
cms3e2o0h00dzuwksphh1f6pr	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/amenities/DSC_4067_f3e178f568.jpg	IMAGE	f	7	2026-07-27 15:35:53.106
cms3e2o0j00e1uwkshhekd8p2	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/amenities/DSC_4161_f9b31ae790.jpg	IMAGE	f	8	2026-07-27 15:35:53.107
cms3e2o0k00e3uwksxbgbgd38	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/amenities/DSC_4245_8eb9750a04.jpg	IMAGE	f	9	2026-07-27 15:35:53.109
cms3e2o0m00e5uwksh1bz2w9m	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/amenities/DSC_4289_159c7fe6ff.jpg	IMAGE	f	10	2026-07-27 15:35:53.11
cms3e2o0n00e7uwksidue8jyr	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/amenities/DSC_4564_b85355189b.jpg	IMAGE	f	11	2026-07-27 15:35:53.112
cms3e2o0p00e9uwksjik96gve	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/amenities/DSC_4663_a101ec1aba.jpg	IMAGE	f	12	2026-07-27 15:35:53.113
cms3e2o0q00ebuwksh8eyz1ad	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/amenities/East-View.jpg	IMAGE	f	13	2026-07-27 15:35:53.115
cms3e2o0s00eduwkstz1zvr3o	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/amenities/Elevation_3_7129e8cdc6.jpg	IMAGE	f	14	2026-07-27 15:35:53.116
cms3e2o0t00efuwkscrndcxxw	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/amenities/North-View.jpg	IMAGE	f	15	2026-07-27 15:35:53.117
cms3e2o0v00ehuwksjarf6idu	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/amenities/Semi-Aerial..jpg	IMAGE	f	16	2026-07-27 15:35:53.119
cms3e2o0x00ejuwksdigrcpg5	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/amenities/Shot_8-New-1_.jpg	IMAGE	f	17	2026-07-27 15:35:53.121
cms3e2o0y00eluwksgsui1zzi	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/amenities/small_DSC_4289_159c7fe6ff.jpg	IMAGE	f	18	2026-07-27 15:35:53.123
cms3e2o1000enuwksk40u2ejo	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/amenities/South-View.jpg	IMAGE	f	19	2026-07-27 15:35:53.124
cms3e2o1200epuwksclzi33oa	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/amenities/swimming-pool-new-CMYK.jpg	IMAGE	f	20	2026-07-27 15:35:53.126
cms3e2o1400eruwksugzm0cke	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/amenities/Update-Dusk-Cam.jpg	IMAGE	f	21	2026-07-27 15:35:53.128
cms3e2o1600etuwkstnem2oyi	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/amenities/UPDATE-FINAL_-BIRD-EYE-CAM.jpg	IMAGE	f	22	2026-07-27 15:35:53.13
cms3e2o1700evuwksx09p56su	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/cover-image.jpg	IMAGE	t	23	2026-07-27 15:35:53.132
cms3e2o1900exuwksyk5fox8e	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Common-Bedroom-(1).jpg	IMAGE	f	24	2026-07-27 15:35:53.133
cms3e2o1b00ezuwkssof7nhsi	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Common-Bedroom-(2).jpg	IMAGE	f	25	2026-07-27 15:35:53.135
cms3e2o1d00f1uwksi8io6xnd	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Common-Bedroom-(3).jpg	IMAGE	f	26	2026-07-27 15:35:53.137
cms3e2o1f00f3uwkshfksov5y	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Common-Washroom.jpg	IMAGE	f	27	2026-07-27 15:35:53.139
cms3e2o1g00f5uwkst03wqqu8	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Dining-Area-(2).jpg	IMAGE	f	28	2026-07-27 15:35:53.141
cms3e2o1i00f7uwks7nw0r888	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Dining-Area.jpg	IMAGE	f	29	2026-07-27 15:35:53.143
cms3e2o1k00f9uwksmqi2wqkq	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Entrance-Lobby-.jpg	IMAGE	f	30	2026-07-27 15:35:53.144
cms3e2o1l00fbuwksivaqbmav	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Kitchen-1.jpg	IMAGE	f	31	2026-07-27 15:35:53.146
cms3e2o1n00fduwksxccx3pfn	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Kitchen-2.jpg	IMAGE	f	32	2026-07-27 15:35:53.147
cms3e2o1p00ffuwksd0midp1s	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Lift-Lobby-.jpg	IMAGE	f	33	2026-07-27 15:35:53.149
cms3e2o1r00fhuwksvqjqvftq	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Living-Room-1.jpg	IMAGE	f	34	2026-07-27 15:35:53.151
cms3e2o1s00fjuwks5pl47ujv	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Living-Room-Balcony.jpg	IMAGE	f	35	2026-07-27 15:35:53.153
cms3e2o1u00fluwksxqy0e20x	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Living-Room.jpg	IMAGE	f	36	2026-07-27 15:35:53.155
cms3e2o1w00fnuwksojw0ewx4	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Master-Bed-room-2.jpg	IMAGE	f	37	2026-07-27 15:35:53.156
cms3e2o1x00fpuwksge0mbh9t	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Master-Bedroom-(2).jpg	IMAGE	f	38	2026-07-27 15:35:53.158
cms3e2o1z00fruwkslriyxe0r	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Master-Bedroom-2..jpg	IMAGE	f	39	2026-07-27 15:35:53.16
cms3e2o2100ftuwksqwd5wkzw	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Master-Bedroom-2.jpg	IMAGE	f	40	2026-07-27 15:35:53.162
cms3e2o2400fvuwksmhwmfljr	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Master-Bedroom-With-Balcony.jpg	IMAGE	f	41	2026-07-27 15:35:53.164
cms3e2o2500fxuwksqlo6lwwe	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Master-Bedroom.jpg	IMAGE	f	42	2026-07-27 15:35:53.166
cms3e2o2700fzuwksc2pu76me	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Master-Washroom-1.jpg	IMAGE	f	43	2026-07-27 15:35:53.167
cms3e2o2900g1uwks9rm2323m	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Walkin-Wardrobe-in-Master-Bedroom.jpg	IMAGE	f	44	2026-07-27 15:35:53.169
cms3e2o2b00g3uwkshr3ubbkv	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Walkin-Wardrobe.jpg	IMAGE	f	45	2026-07-27 15:35:53.171
cms3e2o2d00g5uwkszwm0t6e2	cmryzinnv009euw4smjc2jgcb	\N	http://localhost:5000/uploads/dosti-pine/flat-images/Washroom-2.jpg	IMAGE	f	46	2026-07-27 15:35:53.173
cms3e2o3300g7uwksjcthq0om	cmryzinq300bmuw4s9ui4lu5h	cmryzinq500bouw4shjv7yczz	http://localhost:5000/uploads/dosti-real-planet/flat-image/amber-floor.png	FLOOR_PLAN	f	0	2026-07-27 15:35:53.2
cms3e2o3600g9uwksiazrg18w	cmryzinq300bmuw4s9ui4lu5h	cmryzinqy00couw4su0bczd6t	http://localhost:5000/uploads/dosti-real-planet/flat-image/amber-floor.png	FLOOR_PLAN	f	1	2026-07-27 15:35:53.202
cms3e2o3900gduwkst0i8uku5	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/amentieis/19_fa8098fff9.jpg	IMAGE	f	3	2026-07-27 15:35:53.206
cms3e2o3b00gfuwksfeggszdn	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/amentieis/23_452ddc26e1.jpg	IMAGE	f	4	2026-07-27 15:35:53.208
cms3e2o3d00ghuwks1bym0poq	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/amentieis/small_13_02c6f0fffe.jpg	IMAGE	f	5	2026-07-27 15:35:53.209
cms3e2o3f00gjuwksd1dqpgo7	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/amentieis/small_15_227a60eb97.jpg	IMAGE	f	6	2026-07-27 15:35:53.211
cms3e2o3h00gluwks8ymz7vb1	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/amentieis/small_16_a58e67acac.jpg	IMAGE	f	7	2026-07-27 15:35:53.213
cms3e2o3i00gnuwksijm2pmwo	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/amentieis/small_17_4690452c97.jpg	IMAGE	f	8	2026-07-27 15:35:53.215
cms3e2o3k00gpuwks1flkmun2	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/amentieis/small_18_8e606b6a2d.jpg	IMAGE	f	9	2026-07-27 15:35:53.216
cms3e2o3l00gruwks5de4cyqy	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/amentieis/small_20_a3b94655f5.jpg	IMAGE	f	10	2026-07-27 15:35:53.218
cms3e2o3n00gtuwksb06bh1rh	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/amentieis/small_25_83a95d9e6b.jpg	IMAGE	f	11	2026-07-27 15:35:53.219
cms3e2o3p00gvuwkseg7az99e	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/amentieis/small_2_45c9b59f9c.jpg	IMAGE	f	12	2026-07-27 15:35:53.221
cms3e2o3r00gxuwksctdr7leh	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/amentieis/small_3_02d4e82660.jpg	IMAGE	f	13	2026-07-27 15:35:53.223
cms3e2o3s00gzuwks8x8bl5ip	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/amentieis/small_4_f04e95a06b.jpg	IMAGE	f	14	2026-07-27 15:35:53.225
cms3e2o3u00h1uwksgnuhuluz	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/amentieis/small_5_42e024f249.jpg	IMAGE	f	15	2026-07-27 15:35:53.226
cms3e2o3v00h3uwks7y1edn27	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/amentieis/small_6_fde61e4c12.jpg	IMAGE	f	16	2026-07-27 15:35:53.228
cms3e2o3x00h5uwks8fvqw418	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/amentieis/small_7_cdca32db37.jpg	IMAGE	f	17	2026-07-27 15:35:53.229
cms3e2o3z00h7uwks6smpvj0t	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/amentieis/small_8_26e14a16e6.jpg	IMAGE	f	18	2026-07-27 15:35:53.231
cms3e2o4100h9uwksqvjai9zf	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/amentieis/small_9_b992b8aeb0.jpg	IMAGE	f	19	2026-07-27 15:35:53.233
cms3e2o4300hbuwks44wx1qr3	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/cover-image.jpg	IMAGE	t	20	2026-07-27 15:35:53.235
cms3e2o4500hduwksi9ud7oaf	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/flat-image/COMMON-BATHROOM.jpg	IMAGE	f	21	2026-07-27 15:35:53.237
cms3e2o4600hfuwksg01y47gh	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/flat-image/Dining-Area.jpg	IMAGE	f	22	2026-07-27 15:35:53.239
cms3e2o4800hhuwksssocv4x5	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/flat-image/KIDS-BEDROOM-.jpg	IMAGE	f	23	2026-07-27 15:35:53.241
cms3e2o4a00hjuwks3v73j57b	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/flat-image/KIDS-BEDROOM-1.jpg	IMAGE	f	24	2026-07-27 15:35:53.242
cms3e2o4b00hluwksy44j0nos	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/flat-image/KITCHEN.jpg	IMAGE	f	25	2026-07-27 15:35:53.244
cms3e2o4d00hnuwksxduirqco	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/flat-image/KITCHEN1.jpg	IMAGE	f	26	2026-07-27 15:35:53.246
cms3e2o4f00hpuwksc90uis3r	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/flat-image/LIVING-ROOM-.jpg	IMAGE	f	27	2026-07-27 15:35:53.247
cms3e2o4h00hruwksc4m3qrw2	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/flat-image/LIVING-ROOM-1.jpg	IMAGE	f	28	2026-07-27 15:35:53.249
cms3e2o4i00htuwksk5pyepce	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/flat-image/LIVING-ROOM-3.jpg	IMAGE	f	29	2026-07-27 15:35:53.251
cms3e2o4k00hvuwksol35f6pw	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/flat-image/Living-Room.jpg	IMAGE	f	30	2026-07-27 15:35:53.253
cms3e2o4m00hxuwksvq394qkf	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/flat-image/MASTER-BATHROOM.jpg	IMAGE	f	31	2026-07-27 15:35:53.255
cms3e2o4o00hzuwksv1a17gr7	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/flat-image/MASTER-BED-1.jpg	IMAGE	f	32	2026-07-27 15:35:53.256
cms3e2o4q00i1uwksjjjj4cbr	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/flat-image/MASTER-BED.jpg	IMAGE	f	33	2026-07-27 15:35:53.258
cms3e2o4s00i3uwks1u2c0cpi	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/flat-image/Master-Bedroom-1.jpg	IMAGE	f	34	2026-07-27 15:35:53.26
cms3e2o4t00i5uwksmcijgqdq	cmryzinq300bmuw4s9ui4lu5h	\N	http://localhost:5000/uploads/dosti-real-planet/flat-image/Master-Bedroom.jpg	IMAGE	f	35	2026-07-27 15:35:53.262
cms3e2o5700i7uwkspj5e4w1s	cmryzinro00dkuw4so1o919h4	cmrz4i1td00e9uwsowigfcqai	http://localhost:5000/uploads/dosti-tulip/floor-plan/2-bhk-(2).jpg	FLOOR_PLAN	f	0	2026-07-27 15:35:53.275
cms3e2o5900i9uwks54lhkva0	cmryzinro00dkuw4so1o919h4	cmrz98jjo000buwjcgg0iuudy	http://localhost:5000/uploads/dosti-tulip/floor-plan/2-bhk(1).jpg	FLOOR_PLAN	f	1	2026-07-27 15:35:53.278
cms3e2o5c00ibuwkss2ctnk8n	cmryzinro00dkuw4so1o919h4	cmrz98jkq000duwjcorovwd7h	http://localhost:5000/uploads/dosti-tulip/floor-plan/2-bhk.jpg	FLOOR_PLAN	f	2	2026-07-27 15:35:53.28
cms3e2o5e00iduwksdm4l292q	cmryzinro00dkuw4so1o919h4	cmrz98jmz000huwjcp5xcqxy2	http://localhost:5000/uploads/dosti-tulip/floor-plan/2-bhk-(2).jpg	FLOOR_PLAN	f	3	2026-07-27 15:35:53.282
cms3e2o5g00ifuwkseeqhtiii	cmryzinro00dkuw4so1o919h4	cmrz98jo0000juwjce9ct776f	http://localhost:5000/uploads/dosti-tulip/floor-plan/2-bhk(1).jpg	FLOOR_PLAN	f	4	2026-07-27 15:35:53.284
cms3e2o5h00ihuwksixjhi5kh	cmryzinro00dkuw4so1o919h4	cmrz98jlv000fuwjcnxuthpt2	http://localhost:5000/uploads/dosti-tulip/floor-plan/2-bhk.jpg	FLOOR_PLAN	f	5	2026-07-27 15:35:53.286
cms3e2o5k00ijuwkstwvcrsjm	cmryzinro00dkuw4so1o919h4	cmrz4i1wo00f7uwso2s4jyrca	http://localhost:5000/uploads/dosti-tulip/floor-plan/3-bhk.jpg	FLOOR_PLAN	f	6	2026-07-27 15:35:53.288
cms3e2o5m00iluwks55708qqp	cmryzinro00dkuw4so1o919h4	cmrz98jov000luwjcv9c14d38	http://localhost:5000/uploads/dosti-tulip/floor-plan/3-bhk.jpg	FLOOR_PLAN	f	7	2026-07-27 15:35:53.29
cms3e2o5q00ipuwkszwcnt1n8	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/amenities/11.jpg	IMAGE	f	9	2026-07-27 15:35:53.294
cms3e2o5r00iruwksy8fyioqm	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/amenities/12.jpg	IMAGE	f	10	2026-07-27 15:35:53.295
cms3e2o5t00ituwks5bu7z5nu	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/amenities/2.jpg	IMAGE	f	11	2026-07-27 15:35:53.297
cms3e2o5u00ivuwksfzzxcidj	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/amenities/3.jpg	IMAGE	f	12	2026-07-27 15:35:53.299
cms3e2o5w00ixuwksj5e3twpo	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/amenities/4.jpg	IMAGE	f	13	2026-07-27 15:35:53.3
cms3e2o5x00izuwkso1hj5699	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/amenities/5.jpg	IMAGE	f	14	2026-07-27 15:35:53.302
cms3e2o5z00j1uwksjbeu1urg	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/amenities/6.jpg	IMAGE	f	15	2026-07-27 15:35:53.304
cms3e2o6100j3uwks1uia4cw5	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/amenities/7.jpg	IMAGE	f	16	2026-07-27 15:35:53.306
cms3e2o6300j5uwkszs088iue	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/amenities/8.jpg	IMAGE	f	17	2026-07-27 15:35:53.308
cms3e2o6500j7uwks62u4jtgd	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/amenities/9.jpg	IMAGE	f	18	2026-07-27 15:35:53.31
cms3e2o6700j9uwkscaczf6c9	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/cover-image.jpg	IMAGE	t	19	2026-07-27 15:35:53.312
cms3e2o6900jbuwksasf5j015	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8666-HDR.jpg	IMAGE	f	20	2026-07-27 15:35:53.313
cms3e2o6b00jduwksn82ptxcb	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8691-HDR.jpg	IMAGE	f	21	2026-07-27 15:35:53.316
cms3e2o6d00jfuwks1d9zqi8g	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8711-HDR.jpg	IMAGE	f	22	2026-07-27 15:35:53.318
cms3e2o6f00jhuwks51ep2mjf	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8716-HDR.jpg	IMAGE	f	23	2026-07-27 15:35:53.319
cms3e2o6h00jjuwksk3dsv52b	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8726-HDR.jpg	IMAGE	f	24	2026-07-27 15:35:53.321
cms3e2o6j00jluwks58t4kyoe	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8746-HDR.jpg	IMAGE	f	25	2026-07-27 15:35:53.323
cms3e2o6k00jnuwksijfpvvco	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8796-HDR.jpg	IMAGE	f	26	2026-07-27 15:35:53.325
cms3e2o6m00jpuwksi5fgzzsi	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8816-HDR.jpg	IMAGE	f	27	2026-07-27 15:35:53.327
cms3e2o6o00jruwksfesxitur	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8821-HDR.jpg	IMAGE	f	28	2026-07-27 15:35:53.329
cms3e2o6q00jtuwks0332zg0w	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8826-HDR.jpg	IMAGE	f	29	2026-07-27 15:35:53.331
cms3e2o6s00jvuwksn9ldruo9	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8841-HDR.jpg	IMAGE	f	30	2026-07-27 15:35:53.332
cms3e2o6t00jxuwksxgommzcm	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8861-HDR.jpg	IMAGE	f	31	2026-07-27 15:35:53.334
cms3e2o6v00jzuwkshrgho7aw	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8886-HDR.jpg	IMAGE	f	32	2026-07-27 15:35:53.335
cms3e2o6x00k1uwksoms0aoxo	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8911-HDR.jpg	IMAGE	f	33	2026-07-27 15:35:53.337
cms3e2o6y00k3uwksbyfogqal	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8926-HDR.jpg	IMAGE	f	34	2026-07-27 15:35:53.339
cms3e2o7000k5uwksdzrhjkdu	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8931-HDR.jpg	IMAGE	f	35	2026-07-27 15:35:53.34
cms3e2o7200k7uwksio170eq0	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8971-HDR.jpg	IMAGE	f	36	2026-07-27 15:35:53.342
cms3e2o7300k9uwkskzwoduxd	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8976-HDR.jpg	IMAGE	f	37	2026-07-27 15:35:53.344
cms3e2o7500kbuwksi5xftuec	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8981-HDR.jpg	IMAGE	f	38	2026-07-27 15:35:53.345
cms3e2o7600kduwksvskf81uf	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/1W6A8996-HDR.jpg	IMAGE	f	39	2026-07-27 15:35:53.346
cms3e2o7800kfuwks47gcze7a	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/common-Bathroom-(2).jpg	IMAGE	f	40	2026-07-27 15:35:53.348
cms3e2o7900khuwkskc7felga	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/KITCHEN-1.jpg	IMAGE	f	41	2026-07-27 15:35:53.349
cms3e2o7b00kjuwks0f2gv1fe	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/KITCHEN.jpg	IMAGE	f	42	2026-07-27 15:35:53.351
cms3e2o7c00kluwkszm3h6zym	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/LIVING-ROOM-1.jpg	IMAGE	f	43	2026-07-27 15:35:53.353
cms3e2o7e00knuwksxke77ugj	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/LIVING-ROOM-2.jpg	IMAGE	f	44	2026-07-27 15:35:53.354
cms3e2o7g00kpuwkskhgtgg1a	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/Living-Room.jpg	IMAGE	f	45	2026-07-27 15:35:53.356
cms3e2o7h00kruwkswfds76h0	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/Master-bathroom-1.jpg	IMAGE	f	46	2026-07-27 15:35:53.358
cms3e2o7j00ktuwks7hggrvuo	cmryzinro00dkuw4so1o919h4	\N	http://localhost:5000/uploads/dosti-tulip/flat-images/MASTER-BEDROOM.jpg	IMAGE	f	47	2026-07-27 15:35:53.359
cms3e2o7y00kvuwks9rr7kjk2	cmrz55bod0001uwccft67vh33	cmrz5dy0100gvuw7wzwe9k78l	http://localhost:5000/uploads/dosti-willow/floor-plan/floor_plan_3bhk.png	FLOOR_PLAN	f	0	2026-07-27 15:35:53.374
cms3e2o8300l1uwksks0ls0yy	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/amenities/DSC_0244_7ebf3516e5.jpg	IMAGE	f	3	2026-07-27 15:35:53.379
cms3e2o8500l3uwksnhf6e11r	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/amenities/DSC_4067_f3e178f568.jpg	IMAGE	f	4	2026-07-27 15:35:53.381
cms3e2o8600l5uwkshpsugidt	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/amenities/DSC_4161_f9b31ae790.jpg	IMAGE	f	5	2026-07-27 15:35:53.383
cms3e2o8800l7uwksql1vmjmf	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/amenities/DSC_4245_8eb9750a04.jpg	IMAGE	f	6	2026-07-27 15:35:53.384
cms3e2o8900l9uwkskfg7wkta	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/amenities/DSC_4289_159c7fe6ff.jpg	IMAGE	f	7	2026-07-27 15:35:53.385
cms3e2o8b00lbuwks46ujr99f	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/amenities/DSC_4564_b85355189b.jpg	IMAGE	f	8	2026-07-27 15:35:53.387
cms3e2o8d00lduwksq7u6o79v	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/amenities/DSC_4663_a101ec1aba.jpg	IMAGE	f	9	2026-07-27 15:35:53.389
cms3e2o8e00lfuwksxxcmgw5g	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/amenities/Elevation_3_7129e8cdc6.jpg	IMAGE	f	10	2026-07-27 15:35:53.391
cms3e2o8g00lhuwksv2g5ailm	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/amenities/small_DSC_4289_159c7fe6ff.jpg	IMAGE	f	11	2026-07-27 15:35:53.392
cms3e2o8h00ljuwksbc29edi1	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/cover-image.jpg	IMAGE	t	12	2026-07-27 15:35:53.394
cms3e2o8j00lluwksvkwcurqq	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/flat-images/_PAB1717-HDR.jpg	IMAGE	f	13	2026-07-27 15:35:53.395
cms3e2o8l00lnuwksabijzaxz	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/flat-images/_PAB1723-HDR.jpg	IMAGE	f	14	2026-07-27 15:35:53.397
cms3e2o8m00lpuwkstakxiagg	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/flat-images/_PAB1726-HDR.jpg	IMAGE	f	15	2026-07-27 15:35:53.399
cms3e2o8o00lruwksdn7mzy5q	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/flat-images/_PAB1741-HDR.jpg	IMAGE	f	16	2026-07-27 15:35:53.4
cms3e2o8p00ltuwksz09ahn7m	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/flat-images/_PAB1744-HDR.jpg	IMAGE	f	17	2026-07-27 15:35:53.402
cms3e2o8r00lvuwksaefss2vo	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/flat-images/_PAB1747-HDR.jpg	IMAGE	f	18	2026-07-27 15:35:53.404
cms3e2o8t00lxuwksbit0zxg2	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/flat-images/_PAB1750-HDR.jpg	IMAGE	f	19	2026-07-27 15:35:53.405
cms3e2o8u00lzuwkswv5uwekn	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/flat-images/_PAB1756-HDR.jpg	IMAGE	f	20	2026-07-27 15:35:53.407
cms3e2o8w00m1uwkswon3jcbi	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/flat-images/_PAB1759-HDR.jpg	IMAGE	f	21	2026-07-27 15:35:53.408
cms3e2o8y00m3uwksannkgeo6	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/flat-images/_PAB1771-HDR.jpg	IMAGE	f	22	2026-07-27 15:35:53.41
cms3e2o8z00m5uwksl1p2ho47	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/flat-images/_PAB1777-HDR.jpg	IMAGE	f	23	2026-07-27 15:35:53.412
cms3e2o9100m7uwksanff048u	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/flat-images/_PAB1780-HDR.jpg	IMAGE	f	24	2026-07-27 15:35:53.414
cms3e2o9300m9uwksgj7y30ch	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/flat-images/_PAB1783-HDR.jpg	IMAGE	f	25	2026-07-27 15:35:53.415
cms3e2o9500mbuwksbxwvgb2v	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/flat-images/_PAB1786-HDR.jpg	IMAGE	f	26	2026-07-27 15:35:53.417
cms3e2o9700mduwksvsof8j5a	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/flat-images/_PAB1795-HDR.jpg	IMAGE	f	27	2026-07-27 15:35:53.419
cms3e2o9800mfuwks0kdxp37j	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/flat-images/_PAB1804-HDR.jpg	IMAGE	f	28	2026-07-27 15:35:53.421
cms3e2o9a00mhuwks8qtiux22	cmrz55bod0001uwccft67vh33	\N	http://localhost:5000/uploads/dosti-willow/flat-images/_PAB1810-HDR.jpg	IMAGE	f	29	2026-07-27 15:35:53.423
\.


--
-- Data for Name: Township; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Township" (id, name, description, locality, city, address, latitude, longitude, "googleMapUrl", slug, "createdAt", "updatedAt") FROM stdin;
cmryzineo0000uw4sp02svz7v	Dosti West County	A premium residential township in Thane.	Thane	Mumbai	Phase 2, Off Ghodbunder Road, Near Orchids International School, Brahmand Road, Thane (West) - 400607	19.2208	72.9745	\N	dosti-west-county	2026-07-24 13:37:19.871	2026-07-25 12:30:56.701
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, phone, password, role, "isVerified", "isBlocked", "createdAt", "updatedAt") FROM stdin;
cmryynzeu0000uw9kvrlfqe8r	Admin User	admin@gmail.com	\N	$2b$10$ErWPEUUnjxGjo0UIprd2pulIRyE6XtzQAN48y9t.f7cvj72BwEIhS	ADMIN	t	f	2026-07-24 13:13:29.094	2026-07-24 13:37:19.795
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
a79565c7-dd1a-40a5-9d49-62da53176255	b02acfb6065c436fc3f663e975693fa1d4442f2328836f7b102eb8b3615b4c63	2026-07-24 18:14:13.656576+05:30	20260705084221_init	\N	\N	2026-07-24 18:14:13.485858+05:30	1
de13d239-c287-4350-9dd5-471213c3d721	1a140e88090f917c40b48a6b8b92ef87610362386e769fb5fd558a0e091427e0	2026-07-24 18:14:13.697401+05:30	20260705091128_update_schema	\N	\N	2026-07-24 18:14:13.657334+05:30	1
20d986b5-3fe4-47a7-baa5-930acca1be64	a1fdc103114c518f437408794a8866f5aa637fdefc89ec3793d1fa1749e4b6e5	\N	20260724000000_refactor_to_township_project	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20260724000000_refactor_to_township_project\n\nDatabase error code: 22P02\n\nDatabase error:\nERROR: invalid input value for enum "PropertyType": "APARTMENT"\n\nPosition:\n[1m 60[0m CREATE TABLE IF NOT EXISTS "Project" (\n[1m 61[0m   "id" TEXT NOT NULL,\n[1m 62[0m   "title" TEXT NOT NULL,\n[1m 63[0m   "slug" TEXT NOT NULL,\n[1m 64[0m   "description" TEXT,\n[1m 65[1;31m   "propertyType" "PropertyType" NOT NULL DEFAULT 'APARTMENT',[0m\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E22P02), message: "invalid input value for enum \\"PropertyType\\": \\"APARTMENT\\"", detail: None, hint: None, position: Some(Original(1849)), where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("enum.c"), line: Some(133), routine: Some("enum_in") }\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name="20260724000000_refactor_to_township_project"\n             at schema-engine\\connectors\\sql-schema-connector\\src\\apply_migration.rs:113\n   1: schema_commands::commands::apply_migrations::Applying migration\n           with migration_name="20260724000000_refactor_to_township_project"\n             at schema-engine\\commands\\src\\commands\\apply_migrations.rs:95\n   2: schema_core::state::ApplyMigrations\n             at schema-engine\\core\\src\\state.rs:260	2026-07-24 18:17:28.056779+05:30	2026-07-24 18:14:59.071595+05:30	0
7bc8d000-9b97-4f34-b092-a967d3d91f06	6242b72cddc6880fb688b42dec99a45f616abf6cb9f6b023a6199dad47c04b85	\N	20260724000000_refactor_to_township_project	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20260724000000_refactor_to_township_project\n\nDatabase error code: 55P04\n\nDatabase error:\nERROR: unsafe use of new value "APARTMENT" of enum type "PropertyType"\nHINT: New enum values must be committed before they can be used.\n\nPosition:\n[1m 57[0m CREATE TABLE IF NOT EXISTS "Project" (\n[1m 58[0m   "id" TEXT NOT NULL,\n[1m 59[0m   "title" TEXT NOT NULL,\n[1m 60[0m   "slug" TEXT NOT NULL,\n[1m 61[0m   "description" TEXT,\n[1m 62[1;31m   "propertyType" "PropertyType" NOT NULL DEFAULT 'APARTMENT',[0m\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E55P04), message: "unsafe use of new value \\"APARTMENT\\" of enum type \\"PropertyType\\"", detail: None, hint: Some("New enum values must be committed before they can be used."), position: Some(Original(1925)), where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("enum.c"), line: Some(102), routine: Some("check_safe_enum_use") }\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name="20260724000000_refactor_to_township_project"\n             at schema-engine\\connectors\\sql-schema-connector\\src\\apply_migration.rs:113\n   1: schema_commands::commands::apply_migrations::Applying migration\n           with migration_name="20260724000000_refactor_to_township_project"\n             at schema-engine\\commands\\src\\commands\\apply_migrations.rs:95\n   2: schema_core::state::ApplyMigrations\n             at schema-engine\\core\\src\\state.rs:260	2026-07-24 18:18:34.869972+05:30	2026-07-24 18:18:01.03423+05:30	0
b19f4b1c-8679-4d1e-a118-41b05048b6d7	5fc738c6349a4f8f84baa3209fa63a7557d114dc6e7557cc2fe409ef75b2109f	2026-07-24 18:18:37.187561+05:30	20260723000000_add_apartment_enum	\N	\N	2026-07-24 18:18:37.165404+05:30	1
423fae0b-c467-4012-9a8a-4685fc1cd44f	e866716beeef35d4a23cd8aebd70763cee2017bd1432d44962938092b6866eb8	2026-07-24 18:18:37.388084+05:30	20260724000000_refactor_to_township_project	\N	\N	2026-07-24 18:18:37.188274+05:30	1
\.


--
-- Name: Amenity Amenity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Amenity"
    ADD CONSTRAINT "Amenity_pkey" PRIMARY KEY (id);


--
-- Name: BlogPost BlogPost_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BlogPost"
    ADD CONSTRAINT "BlogPost_pkey" PRIMARY KEY (id);


--
-- Name: Lead Lead_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lead"
    ADD CONSTRAINT "Lead_pkey" PRIMARY KEY (id);


--
-- Name: ProjectAmenity ProjectAmenity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectAmenity"
    ADD CONSTRAINT "ProjectAmenity_pkey" PRIMARY KEY (id);


--
-- Name: ProjectConfiguration ProjectConfiguration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectConfiguration"
    ADD CONSTRAINT "ProjectConfiguration_pkey" PRIMARY KEY (id);


--
-- Name: ProjectMedia ProjectMedia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectMedia"
    ADD CONSTRAINT "ProjectMedia_pkey" PRIMARY KEY (id);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: Township Township_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Township"
    ADD CONSTRAINT "Township_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Amenity_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Amenity_name_key" ON public."Amenity" USING btree (name);


--
-- Name: BlogPost_published_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "BlogPost_published_idx" ON public."BlogPost" USING btree (published);


--
-- Name: BlogPost_slug_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "BlogPost_slug_idx" ON public."BlogPost" USING btree (slug);


--
-- Name: BlogPost_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "BlogPost_slug_key" ON public."BlogPost" USING btree (slug);


--
-- Name: Lead_phone_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Lead_phone_idx" ON public."Lead" USING btree (phone);


--
-- Name: Lead_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Lead_status_idx" ON public."Lead" USING btree (status);


--
-- Name: Lead_type_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Lead_type_idx" ON public."Lead" USING btree (type);


--
-- Name: Project_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Project_slug_key" ON public."Project" USING btree (slug);


--
-- Name: Township_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Township_slug_key" ON public."Township" USING btree (slug);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_phone_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_phone_key" ON public."User" USING btree (phone);


--
-- Name: User_role_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "User_role_idx" ON public."User" USING btree (role);


--
-- Name: BlogPost BlogPost_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BlogPost"
    ADD CONSTRAINT "BlogPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Lead Lead_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lead"
    ADD CONSTRAINT "Lead_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Lead Lead_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lead"
    ADD CONSTRAINT "Lead_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProjectAmenity ProjectAmenity_amenityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectAmenity"
    ADD CONSTRAINT "ProjectAmenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES public."Amenity"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProjectAmenity ProjectAmenity_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectAmenity"
    ADD CONSTRAINT "ProjectAmenity_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProjectConfiguration ProjectConfiguration_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectConfiguration"
    ADD CONSTRAINT "ProjectConfiguration_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProjectMedia ProjectMedia_configurationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectMedia"
    ADD CONSTRAINT "ProjectMedia_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES public."ProjectConfiguration"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProjectMedia ProjectMedia_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectMedia"
    ADD CONSTRAINT "ProjectMedia_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Project Project_townshipId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_townshipId_fkey" FOREIGN KEY ("townshipId") REFERENCES public."Township"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict Zrrie4lgLXV4lQtBMx1DdGaLDP4JkWTdAVPPLgDctNDaP7sHsDxrshhiMhbwr1x


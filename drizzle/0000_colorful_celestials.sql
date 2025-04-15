CREATE TABLE "todo" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "todo_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"text" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

<?php

$usuario = '[SEU_EMAIL]';
$hash_senha = '[HASH_DA_SUA_SENHA]';
$url = '[URL_DO_SEU_CONSTRUTOR]/api/cvio/lead';

$dadosLead = array(
	'acao' => 'salvar_editar',
    'nome' => 'Nivaldo Oliva Segundo',
    'email' => 'nivaldoolivasegundo@gmail.com',
    'telefone' => '(79) 98833-0011',
    'modulo' => 'gestor',
    'facebook' => 'https://pt-br.facebook.com/alfamaweb/',
    'twitter' => 'https://twitter.com/alfamaweb',
    'instagram' => 'https://www.instagram.com/alfamaweb',
    'url_avatar' => 'https://alfamaweb.com.br/assets/img/logo_alfama_blog.png',
);

$dadosLead = json_encode($dadosLead);

$cabecalho = array(
	'email: ' . $usuario,
	'cvhash: ' . $hash_senha,
	'Content-Type: application/json',
	'Content-Length: ' . strlen($dadosLead)
);

$curlHandler = curl_init($url);
curl_setopt($curlHandler, CURLOPT_POSTFIELDS, $dadosLead);
curl_setopt($curlHandler, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($curlHandler, CURLOPT_HTTPHEADER, $cabecalho);
$retorno = curl_exec($curlHandler);

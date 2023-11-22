$("#botaoEnviarDados").on("click", (event) => {

    //TODO: Checar se campos estão validados
    if (!inputsSaoValidos(event)) return;

    $("#botaoEnviarDados").attr("disabled", true);
    const serviceID = "service_4vfyaeg";
    const templateID = "template_lpx04de";
    const templateParams = {
        nomeCompleto: $("#inputNome").val(),
        email: $("#inputEmail").val(),
        telefone: $("#inputTelefone").val()
    }

    return emailjs.send(serviceID, templateID, templateParams)
        .then((obj, params) => {
            $("#inputNome").val("");//limpando o campo após enviar
            $("#inputEmail").val("");
            $("#inputTelefone").val("");
            $("#modalHeader").children('h5').text("Confirmação de Envio de Dados");
            $("#modalBody").children('p').text("Seus dados foram envidados com sucesso. A equipe responsável fará o contato assim que possível.");
            $("#modalFooter").children('button').removeClass("btn-danger").addClass("btn-success");
            return;
        })//caso de sucesso, chamar função de sucesso
        .catch((err) => {
            $("#modalHeader").children('h5').text("Erro no Envio de Dados");
            $("#modalBody").children('p').text("Houve um erro inesperado e seus dados não puderam ser enviados. Por favor, tente novamente mais tarde.");
            $("#modalFooter").children('button').removeClass("btn-success").addClass("btn-danger");            return;
        })//caso de falha, chamar função de falha
        .finally(() => {//independente do sucesso ou falha, esse passo será executado
            $("#modalInscricao").modal();
            return $("#botaoEnviarDados").attr("disabled", false);
        })
});

function inputsSaoValidos(event) {
    if (!$('.needs-validation')[0].checkValidity())
    {
        event.preventDefault(); //para o evento
        event.stopPropagation(); //para qualquer tipo de função que tenha gatilho relacionado ao evento são cortados
        $('.needs-validation').addClass('was-validated');
        return false;
    }
    $('.needs-validation').removeClass('was-validated');
    return true;
}
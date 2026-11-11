// All content lives here (EN + 中文). Edit this file to update any page.
const L=(en,zh)=>({en,zh});
export const UI={
 home:L("Home","首页"),prev:L("Previous","上一页"),cso:L("Proceed to CSO","前往 CSO"),
 menuTitle:L("How can we help you today?","请问需要什么服务？"),
 menuSub:L("Select a banking service to see requirements and procedures.","请选择银行服务，查看所需材料与办理流程。"),
 langTitle:L("Select your language","请选择语言"),langSub:L("Please choose a language to continue","请选择语言以继续"),
 brand:L("BCA Banking Service Guide","BCA Banking Service Guide"),sub:L("Information for Foreign Customers","外籍客户信息指南"),
 docs:L("Please prepare","请准备"),verify:L("Information for verification","验证所需信息"),
 pick:L("Select a service","请选择服务"),step:L("Step","步骤"),
 stepOf:L("of","\u4e4b"),markComplete:L("Mark complete & continue","\u6807\u8bb0\u5b8c\u6210\u5e76\u7ee7\u7eed"),finishStep:L("Mark this step complete","\u6807\u8bb0\u6b64\u6b65\u9aa4\u5b8c\u6210"),continueStep:L("Continue","\u7ee7\u7eed"),previousStep:L("Previous step","\u4e0a\u4e00\u6b65"),stepCompleted:L("Step completed","\u6b65\u9aa4\u5df2\u5b8c\u6210"),allStepsComplete:L("All steps completed","\u6240\u6709\u6b65\u9aa4\u5df2\u5b8c\u6210"),
 csoTitle:L("Proceed to Customer Service","前往客户服务"),
 csoText:L("Please approach our Customer Service Officer (CSO) or use CS Digital at the branch for further assistance.","请前往客户服务专员（CSO）处，或使用网点的 CS Digital 获取进一步协助。"),
 footer:L("This guide is for informational purposes only. All services remain subject to BCA's applicable verification procedures and requirements.","本指南仅供参考。所有服务仍须遵守 BCA 适用的验证程序和要求。"),
 disclaimer:L("Unofficial informational portal. No customer data is collected.","非官方信息门户，不收集任何客户数据。"),
 mayPick:L("You may select one or both.","可选择其中一项或两项。")
};
const VER={k:'ver'};
const verItems=[L("Savings account number (you can check myBCA if you forgot it)","储蓄账户号码（如果忘记，可在 myBCA 查询）"),L("Registered email address","注册的电子邮箱"),L("Registered mobile phone number","注册的手机号码"),L("Date of birth","出生日期"),L("Mother's name","母亲姓名")];
export const VERIFY={
 intro:L("Please write down the following information on the paper provided by our Customer Service Officer (CSO):","请将以下信息写在客户服务专员（CSO）提供的纸上："),
 items:verItems,note:L("This information will be used for verification purposes.","这些信息仅用于身份验证。")};
const P=(en,zh)=>({k:'p',t:L(en,zh)}),H=(en,zh)=>({k:'h',t:L(en,zh)}),N=(en,zh)=>({k:'note',t:L(en,zh)}),W=(en,zh)=>({k:'warn',t:L(en,zh)});
const UL=(...i)=>({k:'ul',items:i.map(x=>L(...x))}),OL=(...i)=>({k:'ol',items:i.map(x=>L(...x))}),DOCS=(...i)=>({k:'docs',items:i.map(x=>L(...x))});
const PASS=["Passport","护照"];
const cardPage=(title,icon,desc,docs)=>({title,icon,desc,blocks:[H("Required documents","所需材料"),DOCS(PASS,...docs),VER,N("Please prepare the required documents and approach our Customer Service Officer for further assistance.","请准备好所需材料，并前往客户服务专员处获取进一步协助。")]});
const csoOnly=(title,icon,desc,en,zh)=>({title,icon,desc,blocks:[{k:'info',t:L(en,zh)}]});
const pending=(title,desc)=>csoOnly(title,'phone',desc,"Please approach our Customer Service Officer for further assistance and guidance regarding this service.","请前往客户服务专员处，获取有关此服务的进一步协助与指引。"); // TODO: replace blocks when procedures are confirmed

const lostBlocks=[H("Required documents","所需材料"),DOCS(PASS),VER];

export const TREE={subs:{
 account:{title:L("Account Opening","开立账户"),icon:'user-plus',desc:L("Individual and corporate accounts","个人与公司账户"),subs:{
  individual:{title:L("Individual Account Opening","个人开户"),icon:'user',desc:L("7 simple steps","共 7 个步骤"),steps:[
   {t:L("Prepare identification documents","\u51c6\u5907\u8eab\u4efd\u8bc1\u660e\u6587\u4ef6"),blocks:[P("Please prepare one of the applicable identification documents:","\u8bf7\u51c6\u5907\u4e0b\u5217\u9002\u7528\u7684\u8eab\u4efd\u8bc1\u660e\u6587\u4ef6\u4e4b\u4e00\uff1a"),DOCS(["Passport","\u62a4\u7167"],["KITAS","KITAS \u5c45\u7559\u8bb8\u53ef"],["Local / national identification card, local driving license, or internal passport (for nationalities that use an internal passport as local identification)","\u672c\u56fd\u8eab\u4efd\u8bc1\u3001\u672c\u56fd\u9a7e\u9a76\u6267\u7167\uff0c\u6216\u56fd\u5185\u62a4\u7167\uff08\u9002\u7528\u4e8e\u4ee5\u56fd\u5185\u62a4\u7167\u4f5c\u4e3a\u672c\u56fd\u8eab\u4efd\u8bc1\u660e\u7684\u56fd\u7c4d\uff09"]),N("Please bring the original document for verification.","\u8bf7\u643a\u5e26\u8bc1\u4ef6\u539f\u4ef6\u4ee5\u4f9b\u6838\u9a8c\u3002")]},
   {t:L("Provide personal information","提供个人信息"),blocks:[P("After submitting your identification document, please write down the following information on the paper provided by the CSO:","提交身份证明文件后，请将以下信息写在 CSO 提供的纸上："),UL(["Email address","电子邮箱"],["Mobile phone number","手机号码"],["Date of birth","出生日期"],["Mother's name","母亲姓名"]),N("This information will be used for verification purposes.","这些信息仅用于身份验证。")]},
   {t:L("Select account product and card option","选择账户产品和卡种"),blocks:[{k:'cardDetails'},{k:'accountOptions'},N("Please show your selections to the Customer Service Officer.","请向客户服务专员出示您的选择。")]},
   {t:L("Review and sign documents","核对并签署文件"),blocks:[P("The CSO will prepare the account opening documents.\n\nPlease review the information provided in the documents and sign in all areas highlighted or indicated by our Customer Service Officer (CSO).","CSO 将准备开户文件。\n\n请核对文件中的信息，并在 CSO 标示或指出的所有位置签名。")]},
   {t:L("Photograph and face recognition","拍照与人脸识别"),blocks:[P("The CSO will guide you through the required photograph and identity verification process, if applicable.","如适用，CSO 将指导您完成所需的拍照和身份验证流程。")]},
   {t:L("ATM card and PIN creation","ATM 卡与 PIN 设置"),blocks:[P("Once your ATM card is ready:","您的 ATM 卡准备好后："),OL(["Follow the CSO's instructions for PIN creation.","按照 CSO 的指引设置 PIN。"],["Create a new PIN.","设置新的 PIN。"],["Re-enter your PIN to confirm.","再次输入 PIN 以确认。"],["Ensure the PIN has been successfully registered.","确认 PIN 已成功登记。"]),W("Never share your PIN with anyone, including bank staff.","切勿向任何人透露您的 PIN，包括银行员工。")]},
   {t:L("Download and activate myBCA","下载并激活 myBCA"),blocks:[OL(["Download the official myBCA application from the App Store or Google Play.","从 App Store 或 Google Play 下载官方 myBCA 应用。"],["Open the application.","打开应用。"],["Inform the CSO when you are ready.","准备好后告知 CSO。"],["Follow the CSO's guidance for registration and activation, if applicable.","如适用，请按照 CSO 的指引完成注册和激活。"])]}]},
  corporate:{title:L("Corporate Account Opening","公司开户"),icon:'building',desc:L("4 simple steps","共 4 个步骤"),steps:[
   {t:L("Prepare company documents","准备公司文件"),blocks:[P("Please prepare the applicable company documents, such as:","请准备适用的公司文件，例如："),DOCS(["Deed of Establishment","公司成立证书"],["Articles of Association and amendments, if any","公司章程及修订文件（如有）"],["Ministry of Law approval / notification, as applicable","法律部批准/通知文件（视情况而定）"],["Business Identification Number (NIB)","营业识别号 (NIB)"],["Company Tax Identification Number (NPWP)","公司税号 (NPWP)"],["Latest management and shareholder information","最新的管理层和股东信息"],["Identification documents of authorized signatories and other relevant parties","授权签字人及其他相关方的身份证明文件"]),N("Additional documents may be required depending on the company's legal structure and BCA's requirements.","根据公司的法律结构及 BCA 的要求，可能需要提供其他文件。")]},
   {t:L("Select account type","选择账户类型"),blocks:[{k:'check',hint:L("You may select one or both.","可选择其中一项或两项。"),items:[L("Giro IDR — Indonesian Rupiah","Giro IDR — 印尼盾"),L("Giro USD — United States Dollar","Giro USD — 美元")]}]},
   {t:L("Review and sign documents","核对并签署文件"),blocks:[P("Review the account opening documents and sign all required sections as indicated by the CSO.","核对开户文件，并按 CSO 的指示在所有必要位置签名。")]},
   {t:L("Digital banking and further assistance","数字银行及进一步协助"),blocks:[P("Receive guidance regarding applicable banking facilities, cards, and digital banking services based on the company's account arrangement.","根据公司的账户安排，获取有关适用银行服务、卡片和数字银行服务的指引。")]}]}}},
 card:{title:L("Card Replacement","补办银行卡"),icon:'card',desc:L("Lost, expired, damaged or forgot PIN","遗失、过期、损坏或忘记 PIN"),subs:{
  lost:cardPage(L("Lost Card","卡片遗失"),'card',L("Passport required","需携带护照"),[]),
  expired:cardPage(L("Expired Card","卡片过期"),'card',L("Passport + expired card required","需要护照和过期卡"),[["Expired ATM card","过期的 ATM 卡"]]),
  damaged:cardPage(L("Damaged Card","卡片损坏"),'card',L("Passport + damaged card required","需要护照和损坏的卡"),[["Damaged ATM card","损坏的 ATM 卡"]]),
  pin:cardPage(L("Forgot PIN","忘记 PIN"),'card',L("Passport + ATM card required","需要护照和 ATM 卡"),[["ATM card","ATM 卡"]])}},
 atm:{title:L("ATM Card Issues","ATM 卡问题"),icon:'atm',desc:L("Retained card, failed transactions","吞卡、交易失败等"),subs:{
  retained:{title:L("ATM Card Retained","ATM 卡被吞"),icon:'atm',desc:L("Card kept by the ATM","卡被 ATM 吞没"),decision:{
    q:L("Was your card issued by BCA?","您的卡是由 BCA 发行的吗？"),yes:L("YES — BCA Card","是 — BCA 卡"),no:L("NO — Foreign Bank Card","否 — 外国银行卡")},subs:{
   bca:{title:L("Lost Card","卡片遗失"),icon:'card',blocks:lostBlocks,cta:true},
   other:{title:L("Contact Your Issuing Bank","请联系发卡银行"),icon:'alert',cta:false,blocks:[{k:'info',t:L("If your ATM card was issued by another bank and retained by a BCA ATM, please contact or visit your card-issuing bank (your home bank) for further assistance.\n\nBCA cannot directly process the retrieval of cards issued by other banks under this procedure.","如果您的 ATM 卡由其他银行发行并被 BCA ATM 吞没，请联系或前往您的发卡银行（您的本国银行）寻求进一步协助。\n\n根据本流程，BCA 无法直接处理其他银行所发行卡片的取回。")}]}}},
  cash:csoOnly(L("Cash Not Dispensed","取款未出钞"),'atm',L("Get help from our CSO","由 CSO 协助"),"Please approach our Customer Service Officer for assistance with the transaction issue.","请前往客户服务专员处，就该交易问题获取协助。"),
  failed:csoOnly(L("ATM Transaction Failed","ATM 交易失败"),'atm',L("Get help from our CSO","由 CSO 协助"),"Please approach our Customer Service Officer for further assistance.","请前往客户服务专员处获取进一步协助。"),
  otheratm:csoOnly(L("Other ATM Issues","其他 ATM 问题"),'atm',L("Get help from our CSO","由 CSO 协助"),"For any other ATM issue, please approach our Customer Service Officer for further assistance.","如有其他 ATM 问题，请前往客户服务专员处获取进一步协助。")}},
 mybca:{title:L("myBCA Assistance","myBCA 协助"),icon:'phone',desc:L("Login, password, transaction limits","登录、密码、交易限额"),subs:{
  unblock:pending(L("Unblock myBCA","解锁 myBCA"),L("Ask our CSO","请咨询 CSO")),
  login:pending(L("Login Issues","登录问题"),L("Ask our CSO","请咨询 CSO")),
  forgot:pending(L("Forgot Password","忘记密码"),L("Ask our CSO","请咨询 CSO")),
  limit:{title:L("Change Transaction Limit","更改交易限额"),icon:'cog',desc:L("Increase or decrease your transaction limit","提高或降低交易限额"),blocks:[P("You can increase or decrease eligible daily transaction limits in these apps:","您可以通过以下应用提高或降低符合条件的每日交易限额："),H("myBCA","myBCA"),OL(["Open Account Saya, then choose Kontrol Akun > Atur Limit.","打开 Account Saya，然后选择 Kontrol Akun > Atur Limit。"]),H("BCA mobile","BCA mobile"),OL(["Open Account Saya, then choose Atur Limit.","打开 Account Saya，然后选择 Atur Limit。"]),N("Available limits depend on the transaction type and your account or card. If you need help, please ask a Customer Service Officer.","可设置的限额取决于交易类型以及您的账户或卡片。如需帮助，请咨询客户服务专员。")]}}},
 data:{title:L("Customer Data Update","客户资料更新"),icon:'cog',desc:L("Phone, email, address","手机、邮箱、地址"),blocks:[P("If you wish to update your personal information, please:","如需更新您的个人信息，请："),OL(["Write down the information you wish to change on the paper provided by our Customer Service Officer (CSO).","将需要更改的信息写在客户服务专员（CSO）提供的纸上。"],["Bring and show the relevant supporting documents, if available.","如有，请携带并出示相关证明文件。"]),H("Examples of information that may need updating","可能需要更新的信息示例"),UL(["Mobile phone number","手机号码"],["Email address","电子邮箱"],["Residential address","居住地址"],["Other personal information","其他个人信息"]),N("The CSO will check the required supporting documents and guide you through the update process.","CSO 将核查所需的证明文件，并指导您完成更新流程。")]},
 other:{title:L("Other Services","其他服务"),icon:'help',desc:L("Not listed in this guide","本指南未列出的服务"),blocks:[{k:'info',t:L("If you require assistance with a service that is not listed in this guide, please approach our Customer Service Officer for further assistance.","如需办理本指南未列出的服务，请前往客户服务专员处获取进一步协助。")}]}
}};

<?
class module_ImportAdmin
{
	
	/// interní id dopravy a platby bude s nazev eshopu
	    	
	public $sitemap = '';
	public $newLine = '';   
	   
	private $name = 'weber';  
	private $_key = "Esan32ofdmedfkl23FSd@8EEW#43vq405JGFSMGere";
	private $_ident = 'weber_';
	private $_prodIdent = 'W';
	private $_id = 18;      
	private $_currency = 'Kč';       
	       
	function __construct($view){
		$this->db =  Zend_Registry::getInstance()->db;
		$this->db3 =  Zend_Registry::getInstance()->db3; /// admin db   
		$this->_tableName      = 'module_eshop_orders';  
		$this->_tableItemsName = 'module_eshop_order_items';
		$this->_tableVariants = 'module_eshop_variants';
		$this->_tableMarksName = 'module_eshop_marks';   
		$this->_tableOffer = 'module_offers';
		$this->_tableOfferItems = 'module_offer_items';   
	} 

	public function setOffer($view, $token)
	{
		$mVarianta = new module_Varianta();
		$offer = (object)$this->db3->fetchRow("select * from ".$this->_tableOffer." where complete = '0' and token=?",$token); 
		if($offer ){ 
			$items = $this->db3->fetchAll("select * from ".$this->_tableOfferItems." where o_id=?", $offer->id);
			$mBasket = new module_Eshop_Basket();
			$mBasket->emptyBasket();
			$input = new stdClass();
			$input->firma = $offer->fu_firma;
			$input->ffirma = $offer->firma;
			$input->ffullname = $offer->firstname.' '.$offer->surname;
			$input->ulice = $offer->fu_ulice;
			$input->mesto = $offer->fu_mesto;
			$input->psc = $offer->fu_psc;
			$input->ico = $offer->fu_ico;
			$input->dic = $offer->fu_dic; 
			$input->fulice = $offer->ulice;
			$input->fMesto = $offer->mesto;
			$input->telefon = $offer->fu_phone;
			$input->ftelefon = $offer->phone;
			$input->fpsc = $offer->psc;  
			$input->fullname = $offer->fu_jmeno;
			$input->email = $offer->email; 
			$view->offerToken = $offer->token;     
			$mBasket->setShopper($view,$input); /// data z offer nasetovat;
			foreach($items as $item)
			{  
				$obj = (object)$item; 
				$ext_id = str_replace($this->_ident,'',$obj->ext_id);
				$localProduct = $mVarianta->getProductByExtId($ext_id);
				$mBasket->addItemQuickShop($localProduct->itemNodeId, $item["count"], $item["price"], $view, $localProduct->id);	
			}
		}
	}

	public function getProduct($ext_id){
		// module_variants/// get
	}

	public function deactiveOffer($offerToken)
	{
		if($offerToken){
			$where = $this->db->quoteInto('token =?',$offerToken);   
			$dat['complete'] = 1;     
			$this->db3->update($this->_tableOffer,$dat,$where); 
		}	
		unset($view->session->offerToken);
	}
	    
	private function getIdMark($name)
	{
		return $this->db3->fetchOne("select id from ".$this->_tableMarksName.' where title =?',strtolower($name));
	}
	    
	private function getPurchasePrice($ext_id)
	{  
		return $this->db3->fetchOne("select purchase_price from ".$this->_tableVariants.' where id_eshop ='.$this->_id.'  and ext_id =?',$ext_id);
	}
	  
	private function setIdAdminOrder($idOrder,$idAminOrder)
	{
		$where = $this->db->quoteInto('id = ?',$idOrder);   
		$dat['id_order_admin'] = $idAminOrder;     
		$this->db->update($this->_tableName,$dat,$where);  
	}  
	
	public function makeOrder($items,$data,$idOrder)
	{
		unset($data['disableHeureka']);     
		unset($data['sk_dic']) ; 
		$data['id_eshop'] = $this->_id;  
		$data['currency'] = $this->_currency;      
		$data['id_order_admin'] = $idOrder;         
		$data['state'] = 1;// nevyřízená  
		$this->db3->insert($this->_tableName,$data);  
		$idAminOrder = $this->db3->lastInsertId();
		$this->setIdAdminOrder($idOrder, $idAminOrder);                  
		foreach ($items as $key => $item) {    
			$item['ext_id']= $this->_prodIdent.$item['ext_id'];      
			$item['mark'] = $this->getIdMark($item['mark']);      
			$item['o_id'] = $idAminOrder;
			$item['purchase_price'] = $this->getPurchasePrice($item['ext_id']);  
		   
			$this->db3->insert(      
					$this->_tableItemsName,
					$item 
				);     
		}       
		return $idAminOrder;       
	} 

	public function setDepositInvoice($idOrder)
	{     
		file_get_contents('http://admin.specshop.cz/?qr=1&id='.$idOrder);
	}  
	  
	private function append2($txt){
    	$this->sitemap .= $txt . $this->newLine;  
    } 
	
	  
	public function renderPayments()
	{             
		$mPayments = new module_Payment();
		$this->append2('<?xml version="1.0" encoding="utf-8"?>');
		$this->append2('<ITEMS>');  
		foreach ($mPayments->getPayments() as $value) {
			$this->append2('<ITEM>');   
			$this->append2('<ID_ITEM>'.$value['id'].'</ID_ITEM>');
			$this->append2('<TITLE>'.$value['nazev'].'</TITLE>');
			$this->append2('<HTML>'.strip_tags($value['popis']).'</HTML>');  
			$this->append2('<VALID>'.$value['valid'].'</VALID>');  
			$this->append2('<PRICE>'.strip_tags($value['cena']).'</PRICE>');   
			$this->append2('<AGMO>'.$value['agmo'].'</AGMO>');   
			$this->append2('</ITEM>');
		}      
		$this->append2('</ITEMS>');
    	ob_clean();
    	header('Content-type: application/xml; charset="utf-8"',true); 
    	echo $this->sitemap;
    	die(); 
	}
	    
	 
	public function renderDelivery()
	{ 
		$mDelivery = new module_Delivery(); 
		$this->append2('<?xml version="1.0" encoding="utf-8"?>');
		$this->append2('<ITEMS>');
		foreach ($mDelivery->getDeliveries2() as $value) {
			$this->append2('<ITEM>');
			$this->append2('<ID_ITEM>'.$value['id'].'</ID_ITEM>');
			$this->append2('<TITLE>'.$value['nazev'].'</TITLE>');
			$this->append2('<PRICE>'.$value['price'].'</PRICE>');
			$this->append2('<VALID>'.$value['valid'].'</VALID>');    
			$this->append2('<START>'.$value['od'].'</START>');  
			foreach ($value['payments'] as $item) {
				$paymentsIds[] = $item['id']; 
			}         
			$this->append2('<PAYMENTSIDS>'.implode(';', $paymentsIds).'</PAYMENTSIDS>');
			$this->append2('<END>'.$value['do'].'</END>');
			$this->append2('<HTML>'.strip_tags($value['popis']).'</HTML>');   
			$this->append2('</ITEM>');
		}   
		$this->append2('</ITEMS>');
    	ob_clean();
    	header('Content-type: application/xml; charset="utf-8"',true); 
    	echo $this->sitemap;
    	die(); 
	}
	   
	public function renderProducts($view){
    	$mp = new module_Products();
    	$mVarianta = new module_Varianta();
		$params['cms'] = 1;                  
		$pages = $mp->getProducts('title', 'asc',0, 9999, $params);  
    	$basePath = Utils::getWebUrl();
    	$this->append2('<?xml version="1.0" encoding="utf-8"?>');
    	$this->append2('<shop>');
    	$znacky = array();  
    	$z = $mp->getZnacky(false, false);
    	foreach ($z as $zz){
    		$znacky[$zz['id']] = $zz;
    	}             
    	foreach ($pages as $page){           
    		$page['dph'] = $page['dphQuote'];
    		$html = $page['html'];
			$html = str_replace(array('<p>','</p>', '<div>', '</div>'), '', $html);  
    		$n = $view->tree->getNodeById($page['id']);			
    		$c = $n->getTheRightContent();
    		$znacka = $znacky[$page['znacka']];
    	  	if(!$page['model'])
				$page['model'] = $page['id'];	             
			$this->append2('<SHOPITEM>');      
			$photosEmail = $mVarianta->getResizedPhotos($page['obrazky']);
			$p = helper_FrontEnd::getFirstPhoto($photosEmail,'pMinic2' , false);

			$price = $page['price4']?$page['price4']:$page['price'];   
			$this->append2('<PRODUCTNAME>'.$this->cleanText($page['title']).'</PRODUCTNAME>');           
			$this->append2('<PURCHASE_PRICE>'.$page['purchase_price'].'</PURCHASE_PRICE>'); // načítá se z Admin
    	//	$this->append2('<PRICE>' . $price  . '</PRICE>');      
    		$this->append2('<PRICE_VAT>' . $price   . '</PRICE_VAT>');
			$this->append2('<EMAIL_PHOTOS>'. $basePath .  $p['path']   . '</EMAIL_PHOTOS>');
			$this->append2('<PRICE_VAT2>' . $page['price2']   . '</PRICE_VAT2>');       
			$this->append2('<INV_TITLE>'.$this->cleanText($page['inv_title']).'</INV_TITLE>');     
    		$this->append2('<EXT_ID>'.$this->_prodIdent. $page['model'] . '</EXT_ID>');  
			$this->append2('<ESHOP_ITEM_ID>' .$this->_ident. $page['model'] . '</ESHOP_ITEM_ID>'); 
			$this->append2('<MODEL>W' .$page['model'] . '</MODEL>'); 
    		$this->append2('<VAT>'.$page['dph'].'</VAT>');              
    		if($page['EAN']){        
    			$this->append2('<EAN>' . $page['EAN'] . '</EAN>');   
    		}           
    		$this->append2('<DESCRIPTION><![CDATA[' . strip_tags($html) . ']]></DESCRIPTION>');
			$this->append2('<MANUFACTURER>'.$znacka['nazev'].'</MANUFACTURER>');          
    		$this->append2('<CURRENCY>Kč</CURRENCY>');              
    		$this->append2('<URL>' . $basePath . $page['path'] . '</URL>');
			$this->append2('<STATE>' .$page['state']. '</STATE>');   
			$this->append2('<AVAILABILITY>' .$page['skladem']. '</AVAILABILITY>');
			$this->append2('<AMOUNT>' .$page['amount']. '</AMOUNT>');
    		if($pathPhoto['path']){ 
    			$this->append2('<IMGURL>' . $basePath . html_entity_decode($pathPhoto['path']). '</IMGURL>');   
    		}     
    		$this->append2('</SHOPITEM>');
    	}
    	$this->append2('</shop>');     
    	ob_clean();
    	header('Content-type: application/xml; charset="utf-8"',true); 
    	echo $this->sitemap;
    	die();
    }

	private function cleanText($html)
	{
		$html = trim(strip_tags($html));   
		$html = str_replace('×', ' x' , $html);   
		$html = str_replace('&', '&amp;' , $html);             
		 return html_entity_decode(str_replace('  
 ', ' ', str_replace('
 
','',str_replace('°','',str_replace('&','',str_replace('©','',trim(strip_tags($html))))))));        
		      
	}     
		

	// ids = je do jakých produktů se to importuje, id = vlastník
	function setProducts($urlFeed) {
		$data = simplexml_load_file($urlFeed); 
		foreach ($data as $item) {
			$this->setProduct($item)  ;        	 	      
		}
		$mAdmin = new module_Products();   
		$categories = array(76933,76932,76934,76936,76935); // grily
		foreach ($categories as $ite){
			$params['category'] = $ite;     
			$data = $mAdmin->getProducts(false,false,0,10000,$params);  
			foreach($data as $item)
			{       
				$where = $mAdmin->db->quoteInto("id_product =?",$item['cid']);
				$dat['skladem'] = '1';  
				$mAdmin->db->update("module_eshop_variants",$dat,$where);
			}
		}
	}   

	public function setProduct($item) 
	{
		$variant = $d = array();  
		$contentId = $this->isExists((string)$item->EXT_ID); 
		$up = $this->db->fetchOne("select update_product from ".$this->_tableVariants." where id_product =?",$contentId->id_product  );
		// nastaví se skladovost 
		//1 - pokud je produkt skladem i přes update_product == 1 na skladem, když bude AMOUNT > 0
		//2 - update_product == 0 nastaví se aktualní skladovost
		//3 - pokud je update_product == 1 a sklad je AMOUNT == 0, tak se skladovost necha
		if($contentId->id_product > 0){
			$amout = (string)$item->AMOUNT;
			if($up == '0')
			{
				$skladem = $amout > 0 ? '1' : '4'; 
				$wh = $this->db->quoteInto("id_product =?",$contentId->id_product); 
				$variant['skladem'] = $skladem;
				$this->db->update($this->_tableVariants,$variant,$wh); 
			}
			elseif($up == '1' && $amout > 0) 
			{
				$skladem = '1';
				$wh = $this->db->quoteInto("id_product =?",$contentId->id_product); 
				$variant['skladem'] = $skladem;
				$this->db->update($this->_tableVariants,$variant,$wh); 
			}	
		}
	} 
	
	private function isExists($model)
	{
		$model = str_replace("W","",$model);	
		$varianta = (object)$this->db->fetchRow("select id_product from ".$this->_tableVariants." where `model`=:e", 
			array('e' => $model));
		return $varianta;
	}    

	
}